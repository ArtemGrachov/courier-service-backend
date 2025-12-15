import { Injectable, NotFoundException } from '@nestjs/common';

import { EOrderStatus } from '../../constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { OrderDataService } from '../order-data/order-data.service';

import type { IRequstUser } from 'src/types/auth/request-user';

import { addRating } from 'src/utils/add-rating';

@Injectable()
export class CompleteOrderService {
  constructor(
    private prismaService: PrismaService,
    private orderDataService: OrderDataService,
  ) {}

  public async completeOrder(
    requestUser: IRequstUser,
    id: number,
    senderRating: number,
    receiverRating: number,
  ) {
    const order = await this.orderDataService.getOrder({
      where: {
        id,
      },
    });

    if (!order) {
      throw new NotFoundException();
    }

    await this.prismaService.$transaction(async tx => {
      await tx.order.update({
        where: {
          id,
        },
        data: {
          status: EOrderStatus.COMPLETED,
        },
      });

      await tx.userCourier.update({
        where: {
          id: requestUser.id,
        },
        data: {
          activeOrdersCount: {
            decrement: 1,
          },
          completedOrdersCount: {
            increment: 1,
          },
        },
      });

      await tx.userClient.update({
        where: {
          id: order.senderId,
        },
        data: {
          activeOrdersCount: {
            decrement: 1,
          },
          completedOrdersCount: {
            increment: 1,
          },
        },
      });

      await tx.userClient.update({
        where: {
          id: order.receiverId,
        },
        data: {
          activeOrdersCount: {
            decrement: 1,
          },
          completedOrdersCount: {
            increment: 1,
          },
        },
      });

      await tx.clientRate.create({
        data: {
          orderId: id,
          rating: senderRating,
          clientId: order.senderId,
          courierId: requestUser.id,
        },
      });

      await tx.clientRate.create({
        data: {
          orderId: id,
          rating: receiverRating,
          clientId: order.receiverId,
          courierId: requestUser.id,
        },
      });

      const sender = await tx.userClient.findUnique({
        where: {
          id: order.senderId,
        },
      });

      const receiver = await tx.userClient.findUnique({
        where: {
          id: order.receiverId,
        },
      });

      if (sender) {
        const { averageRating, count } = addRating(sender.rating ?? 0, sender.ratingCount ?? 0, senderRating);
        await tx.userClient.update({
          where: {
            id: order.senderId,
          },
          data: {
            rating: averageRating,
            ratingCount: count,
          },
        });
      }

      if (receiver) {
        const { averageRating, count } = addRating(receiver.rating ?? 0, receiver.ratingCount ?? 0, receiverRating);
        await tx.userClient.update({
          where: {
            id: order.receiverId,
          },
          data: {
            rating: averageRating,
            ratingCount: count,
          },
        });
      }
    });
  }
}

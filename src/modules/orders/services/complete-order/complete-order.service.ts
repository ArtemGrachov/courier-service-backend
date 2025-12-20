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
          active_orders_count: {
            decrement: 1,
          },
          completed_orders_count: {
            increment: 1,
          },
        },
      });

      await tx.userClient.update({
        where: {
          id: order.sender_id,
        },
        data: {
          active_orders_count: {
            decrement: 1,
          },
          completed_orders_count: {
            increment: 1,
          },
        },
      });

      await tx.userClient.update({
        where: {
          id: order.receiver_id,
        },
        data: {
          active_orders_count: {
            decrement: 1,
          },
          completed_orders_count: {
            increment: 1,
          },
        },
      });

      await tx.clientRate.create({
        data: {
          order_id: id,
          rating: senderRating,
          client_id: order.sender_id,
          courier_id: requestUser.id,
        },
      });

      await tx.clientRate.create({
        data: {
          order_id: id,
          rating: receiverRating,
          client_id: order.receiver_id,
          courier_id: requestUser.id,
        },
      });

      const sender = await tx.userClient.findUnique({
        where: {
          id: order.sender_id,
        },
      });

      const receiver = await tx.userClient.findUnique({
        where: {
          id: order.receiver_id,
        },
      });

      if (sender) {
        const { averageRating, count } = addRating(sender.rating ?? 0, sender.rating_count ?? 0, senderRating);
        await tx.userClient.update({
          where: {
            id: order.sender_id,
          },
          data: {
            rating: averageRating,
            rating_count: count,
          },
        });
      }

      if (receiver) {
        const { averageRating, count } = addRating(receiver.rating ?? 0, receiver.rating_count ?? 0, receiverRating);
        await tx.userClient.update({
          where: {
            id: order.receiver_id,
          },
          data: {
            rating: averageRating,
            rating_count: count,
          },
        });
      }
    });
  }
}

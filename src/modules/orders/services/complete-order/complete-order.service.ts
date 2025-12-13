import { Injectable, NotFoundException } from '@nestjs/common';

import { EOrderStatus } from '../../constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import type { IRequstUser } from 'src/types/auth/request-user';

@Injectable()
export class CompleteOrderService {
  constructor(private prismaService: PrismaService) {}

  public async completeOrder(
    requestUser: IRequstUser,
    id: number,
    senderRating: number,
    receiverRating: number,
  ) {
    const order = await this.prismaService.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException();
    }

    await this.prismaService.$transaction([
      this.prismaService.order.update({
        where: {
          id,
        },
        data: {
          status: EOrderStatus.COMPLETED,
        },
      }),
      this.prismaService.userCourier.update({
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
      }),
      this.prismaService.userClient.update({
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
      }),
      this.prismaService.userClient.update({
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
      }),
    ]);

    await this.prismaService.clientRate.create({
      data: {
        orderId: id,
        rating: senderRating,
        clientId: order?.senderId,
        courierId: requestUser.id,
      },
    });

    await this.prismaService.clientRate.create({
      data: {
        orderId: id,
        rating: receiverRating,
        clientId: order?.receiverId,
        courierId: requestUser.id,
      },
    });
  }
}

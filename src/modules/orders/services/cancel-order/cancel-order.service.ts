import { Injectable, NotFoundException } from '@nestjs/common';

import { EOrderStatus } from '../../constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { OrderDataService } from '../order-data/order-data.service';

import type { IRequstUser } from 'src/types/auth/request-user';

@Injectable()
export class CancelOrderService {
  constructor(
    private prismaService: PrismaService,
    private orderDataService: OrderDataService,
  ) {}

  public async cancelOrder(requestUser: IRequstUser, id: number) {
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
          status: EOrderStatus.CANCELLED,
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
            decrement: 1,
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
            decrement: 1,
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
            decrement: 1,
          },
        },
      });
    });
  }
}

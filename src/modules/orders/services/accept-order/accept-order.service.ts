import { Injectable, NotFoundException } from '@nestjs/common';

import { EOrderStatus } from '../../constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import type { IRequstUser } from 'src/types/auth/request-user';

@Injectable()
export class AcceptOrderService {
  constructor(private prismaService: PrismaService) {}

  public async acceptOrder(requestUser: IRequstUser, id: number) {
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
          courierId: requestUser.id,
          status: EOrderStatus.PROCESSING,
        },
      }),
      this.prismaService.userCourier.update({
        where: {
          id: requestUser.id,
        },
        data: {
          activeOrdersCount: {
            increment: 1,
          },
        },
      }),
    ]);
  }
}


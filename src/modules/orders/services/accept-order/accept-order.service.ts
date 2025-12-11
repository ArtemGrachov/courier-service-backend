import { Injectable } from '@nestjs/common';

import { EOrderStatus } from '../../constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import type { IRequstUser } from 'src/types/auth/request-user';

@Injectable()
export class AcceptOrderService {
  constructor(private prismaService: PrismaService) {}

  public async acceptOrder(requestUser: IRequstUser, id: number) {
    await this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        courierId: requestUser.id,
        status: EOrderStatus.PROCESSING,
      },
    });
  }
}


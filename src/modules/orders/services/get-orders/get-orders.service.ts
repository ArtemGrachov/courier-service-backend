import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { IGetOrdersQuery } from './types';
import { OrderWhereInput } from 'src/generated/prisma/models';

@Injectable()
export class GetOrdersService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  public async getOrders({ page, itemsPerPage, couriers, senders, receivers }: IGetOrdersQuery) {
    const skip = (page - 1) * itemsPerPage;

    let where: OrderWhereInput = {};

    if (couriers?.length) {
      where.courierId = {
        in: couriers,
      };
    }

    if (senders?.length) {
      where.senderId = {
        in: senders,
      };
    }

    if (receivers?.length) {
      where.receiverId = {
        in: receivers,
      };
    }

    const items = await this.prismaService.order.findMany({
      skip,
      take: itemsPerPage,
      where,
    });

    return {
      items,
      pagination: {
        page,
        itemsPerPage,
      },
    };
  }
}


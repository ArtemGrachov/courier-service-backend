import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { IGetOrdersQuery } from './types';
import { OrderWhereInput } from 'src/generated/prisma/models';

@Injectable()
export class GetOrdersService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  public async getOrders({ page, itemsPerPage, couriers }: IGetOrdersQuery) {
    const skip = (page - 1) * itemsPerPage;

    let where: OrderWhereInput = {};

    if (couriers) {
      where.courierId = {
        in: couriers,
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


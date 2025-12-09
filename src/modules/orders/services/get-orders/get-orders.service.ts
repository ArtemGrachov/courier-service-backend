import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { IGetOrdersQuery } from './types';

@Injectable()
export class GetOrdersService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  public async getOrders({ page, itemsPerPage }: IGetOrdersQuery) {
    const skip = (page - 1) * itemsPerPage;

    const items = await this.prismaService.order.findMany({
      skip,
      take: itemsPerPage,
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


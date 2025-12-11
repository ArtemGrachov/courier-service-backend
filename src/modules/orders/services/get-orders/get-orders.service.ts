import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { ESortOrder } from 'src/constants/sort';

import { IGetOrdersQuery } from './types';
import { OrderOrderByWithRelationInput, OrderWhereInput } from 'src/generated/prisma/models';

@Injectable()
export class GetOrdersService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  public async getOrders({
    page,
    itemsPerPage,
    couriers,
    senders,
    receivers,
    sortBy,
    sortOrder,
  }: IGetOrdersQuery) {
    const skip = (page - 1) * itemsPerPage;

    let orderBy: OrderOrderByWithRelationInput | undefined;
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

    if (sortBy) {
      orderBy = {
        [sortBy]: sortOrder ?? ESortOrder.DESC,
      };
    }

    const items = await this.prismaService.order.findMany({
      skip,
      take: itemsPerPage,
      where,
      orderBy,
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


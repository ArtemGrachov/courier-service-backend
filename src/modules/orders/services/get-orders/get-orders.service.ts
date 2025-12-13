import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { ESortOrder } from 'src/constants/sort';

import { GetOrdersDto } from '../../dto/get-orders.dto';
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
    status,
    receivers,
    sortBy,
    sortOrder,
  }: GetOrdersDto) {
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

    if (status?.length) {
      where.status = {
        in: status,
      };
    }

    if (sortBy) {
      orderBy = {
        [sortBy]: sortOrder ?? ESortOrder.DESC,
      };
    }

    const query = {
      skip,
      take: itemsPerPage,
      where,
      orderBy,
    };

    const [items, totalItems] = await this.prismaService.$transaction([
      this.prismaService.order.findMany(query),
      this.prismaService.order.count(query),
    ]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      items,
      pagination: {
        page,
        itemsPerPage,
        totalItems,
        totalPages,
      },
    };
  }
}


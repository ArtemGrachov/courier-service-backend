import { Injectable } from '@nestjs/common';

import { ECouriersSortBy } from './constants';
import { ESortOrder } from 'src/constants/sort';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { UserCourierOrderByWithRelationInput, UserCourierWhereInput } from 'src/generated/prisma/models';
import { IGetCouriersQuery } from './types';

@Injectable()
export class GetCouriersService {
  constructor(private prismaService: PrismaService) {}

  public async getCouriers({
    page,
    itemsPerPage,
    status,
    sortBy,
    sortOrder,
  }: IGetCouriersQuery) {

    const skip = (page - 1) * itemsPerPage;

    let orderBy: UserCourierOrderByWithRelationInput | undefined;
    let where: UserCourierWhereInput = {};

    if (status?.length) {
      where.status = {
        in: status,
      };
    }

    if (sortBy) {
      let sortKey: string | null = null;

      switch (sortBy) {
        case ECouriersSortBy.TOTAL_ORDERS: {
          sortKey = 'totalOrdersCount';
          break;
        }
        case ECouriersSortBy.ACTIVE_ORDERS: {
          sortKey = 'activeOrdersCount';
          break;
        }
        case ECouriersSortBy.COMPLETED_ORDERS: {
          sortKey = 'completedOrdersCount';
          break;
        }
        case ECouriersSortBy.RATING: {
          sortKey = 'rating';
          break;
        }
      }

      if (sortKey) {
        orderBy = {
          [sortKey]: sortOrder ?? ESortOrder.DESC,
        };
      }
    }

    const query = {
      skip,
      take: itemsPerPage,
      where,
      orderBy,
    }

    const [items, totalItems] = await this.prismaService.$transaction([
      this.prismaService.userCourier.findMany(query),
      this.prismaService.userCourier.count({
        ...query,
        skip: undefined,
        take: undefined,
      }),
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


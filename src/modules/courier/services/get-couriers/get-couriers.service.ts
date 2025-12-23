import { Injectable } from '@nestjs/common';

import { ECouriersSortBy } from './constants';
import { ESortOrder } from 'src/constants/sort';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { UserCourierOrderByWithRelationInput, UserCourierWhereInput } from 'src/generated/prisma/models';
import { GetCouriersDto } from '../../dto/get-couriers.dto';

@Injectable()
export class GetCouriersService {
  constructor(private prismaService: PrismaService) {}

  public async getCouriers({
    page,
    itemsPerPage,
    search,
    email,
    phone,
    name,
    status,
    sortBy,
    sortOrder,
  }: GetCouriersDto) {

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
          sortKey = 'total_orders_count';
          break;
        }
        case ECouriersSortBy.ACTIVE_ORDERS: {
          sortKey = 'active_orders_count';
          break;
        }
        case ECouriersSortBy.COMPLETED_ORDERS: {
          sortKey = 'completed_orders_count';
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

    if (search) {
      where.AND = [
        { ...where },
        {
          OR: [
            {
              phone: {
                contains: `%${search}%`,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: `%${search}%`,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: `%${search}%`,
                mode: 'insensitive',
              },
            },
          ],
        },
      ];
    } else {
      if (phone) {
        where.phone = {
          contains: `%${phone}%`,
          mode: 'insensitive',
        };
      }

      if (email) {
        where.email = {
          contains: `%${email}%`,
          mode: 'insensitive',
        };
      }

      if (name) {
        where.name = {
          contains: `%${name}%`,
          mode: 'insensitive',
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


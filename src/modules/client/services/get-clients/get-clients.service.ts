import { Injectable } from '@nestjs/common';

import { ESortOrder } from 'src/constants/sort';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { EClientsSortBy } from './constants';

import { GetClientsDto } from '../../dto/get-clients.dto';
import { UserClientOrderByWithRelationInput, UserClientWhereInput } from 'src/generated/prisma/models';

@Injectable()
export class GetClientsService {
  constructor(private prismaService: PrismaService) {}

  public async getClients({
    page,
    itemsPerPage,
    name,
    phone,
    email,
    search,
    sortBy,
    sortOrder,
  }: GetClientsDto) {

    const skip = (page - 1) * itemsPerPage;

    let orderBy: UserClientOrderByWithRelationInput | undefined;
    let where: UserClientWhereInput = {};

    if (sortBy) {
      let sortKey: string | null = null;

      switch (sortBy) {
        case EClientsSortBy.NAME: {
          sortKey = 'name';
          break;
        }
        case EClientsSortBy.TOTAL_ORDERS: {
          sortKey = 'total_orders_count';
          break;
        }
        case EClientsSortBy.ACTIVE_ORDERS: {
          sortKey = 'active_orders_count';
          break;
        }
        case EClientsSortBy.COMPLETED_ORDERS: {
          sortKey = 'completed_orders_count';
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
      if (name) {
        where.name = {
          contains: `%${name}%`,
          mode: 'insensitive',
        };
      }

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
    }

    const query = {
      skip,
      take: itemsPerPage,
      where,
      orderBy,
    }

    const [items, totalItems] = await this.prismaService.$transaction([
      this.prismaService.userClient.findMany(query),
      this.prismaService.userClient.count({
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


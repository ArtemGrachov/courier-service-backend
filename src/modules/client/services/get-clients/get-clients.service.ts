import { Injectable } from '@nestjs/common';

// import { ESortOrder } from 'src/constants/sort';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

// import { EClientsSortBy } from './constants';

import { GetClientsDto } from '../../dto/get-clients.dto';
import { UserClientOrderByWithRelationInput, UserClientWhereInput } from 'src/generated/prisma/models';

@Injectable()
export class GetClientsService {
  constructor(private prismaService: PrismaService) {}

  public async getClients({
    page,
    itemsPerPage,
    /*
    phone,
    sortBy,
    sortOrder,
    */
  }: GetClientsDto) {

    const skip = (page - 1) * itemsPerPage;

    let orderBy: UserClientOrderByWithRelationInput | undefined;
    let where: UserClientWhereInput = {};

    /*
    TODO Extend client model with appropriate fields
    if (sortBy) {
      let sortKey: string | null = null;

      switch (sortBy) {
        case EClientsSortBy.TOTAL_ORDERS: {
          sortKey = 'totalOrdersCount';
          break;
        }
        case EClientsSortBy.ACTIVE_ORDERS: {
          sortKey = 'activeOrdersCount';
          break;
        }
        case EClientsSortBy.COMPLETED_ORDERS: {
          sortKey = 'completedOrdersCount';
          break;
        }
      }

      if (sortKey) {
        orderBy = {
          [sortKey]: sortOrder ?? ESortOrder.DESC,
        };
      }
    }
    */

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


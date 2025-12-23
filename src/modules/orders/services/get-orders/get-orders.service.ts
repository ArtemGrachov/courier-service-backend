import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { OrderCountArgs, OrderFindManyArgs, OrderOrderByWithRelationInput, OrderWhereInput } from 'src/generated/prisma/models';

import { EOrdersSortBy } from './constants';
import { ESortOrder } from 'src/constants/sort';
import { ERoles } from 'src/constants/auth';

import { GetOrdersDto } from '../../dto/get-orders.dto';
import { IRequstUser } from 'src/types/auth/request-user';

@Injectable()
export class GetOrdersService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  public async getOrders(
    user: IRequstUser,
    {
      page,
      itemsPerPage,
      couriers,
      senders,
      receivers,
      status,
      sortBy,
      sortOrder,
    }: GetOrdersDto,
  ) {
    const skip = (page - 1) * itemsPerPage;

    let orderBy: OrderOrderByWithRelationInput | undefined;
    let where: OrderWhereInput = {};

    if (couriers?.length) {
      where.courier_id = {
        in: couriers,
      };
    }

    if (senders?.length) {
      where.sender_id = {
        in: senders,
      };
    }

    if (receivers?.length) {
      where.receiver_id = {
        in: receivers,
      };
    }

    if (status?.length) {
      where.status = {
        in: status,
      };
    }

    if (sortBy) {
      let sortKey: string | null = null;

      switch (sortBy) {
        case EOrdersSortBy.ORDERED_DATE: {
          sortKey = 'ordered_at';
          break;
        }
        case EOrdersSortBy.COMPLETED_DATE: {
          sortKey = 'completed_at';
          break;
        }
      }

      if (sortKey) {
        orderBy = {
          [sortKey]: sortOrder ?? ESortOrder.DESC,
        };
      }
    }

    const query: OrderFindManyArgs = {
      skip,
      take: itemsPerPage,
      where,
      orderBy,
      include: {
        sender: true,
        receiver: true,
        courier: true,
      },
    };

    if (user) {
      let userQuery: OrderWhereInput | null = null;

      switch (user.role) {
        case ERoles.CLIENT: {
          userQuery = {
            OR: [
              { sender_id: user.id },
              { receiver_id: user.id },
            ],
          };
          break;
        }
        case ERoles.COURIER: {
          userQuery = {
            courier_id: user.id,
          };
          break;
        }
      }

      if (userQuery) {
        query.where = {
          AND: [
            query.where!,
            userQuery,
          ],
        };
      }
    }

    const [items, totalItems] = await this.prismaService.$transaction([
      this.prismaService.order.findMany(query),
      this.prismaService.order.count({
        ...query,
        include: undefined,
        skip: undefined,
        take: undefined,
      } as OrderCountArgs),
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


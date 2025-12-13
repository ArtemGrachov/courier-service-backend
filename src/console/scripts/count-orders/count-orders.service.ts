import { Injectable } from '@nestjs/common';
import { UserCourierUpdateInput } from 'src/generated/prisma/models';
import { EOrderStatus } from 'src/modules/orders/constants/order';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class CountOrdersService {
  constructor(private prismaService: PrismaService) {}

  public async countCourierOrders() {
    const grouped = await this.prismaService.order.groupBy({
      by: ['courierId', 'status'],
      _count: {
        id: true,
      },
    });

    const totalMap = new Map<number, number>();

    for (let item of grouped) {
      if (item.courierId == null) {
        continue;
      }

      const data: UserCourierUpdateInput = {};

      switch (item.status) {
        case EOrderStatus.COMPLETED: {
          data.completedOrdersCount = item._count.id;
          break;
        }
        case EOrderStatus.PROCESSING: {
          data.activeOrdersCount = item._count.id;
          break;
        }
      }

      data.totalOrdersCount = (totalMap.get(item.courierId) ?? 0) + item._count.id;
      totalMap.set(item.courierId, data.totalOrdersCount);

      await this.prismaService.userCourier.update({
        where: {
          id: item.courierId,
        },
        data,
      });
    }
  }
}


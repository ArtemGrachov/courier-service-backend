import { Injectable } from '@nestjs/common';
import { countOrders } from 'src/generated/prisma/sql';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class CountOrdersService {
  constructor(private prismaService: PrismaService) {}

  public async countOrders() {
    const result = await this.prismaService.$queryRawTyped(countOrders());

    for (const item of result) {
      if (!item.entity_id) {
        continue;
      }

      const activeOrdersCount = Number(item.active_count);
      const completedOrdersCount = Number(item.completed_count);
      const totalOrdersCount = activeOrdersCount + completedOrdersCount;

      switch (item.entity_type) {
        case 'courier': {
          await this.prismaService.userCourier.update({
            where: {
              id: item.entity_id,
            },
            data: {
              active_orders_count: activeOrdersCount,
              completed_orders_count: completedOrdersCount,
              total_orders_count: totalOrdersCount,
            },
          });
          break;
        }
        case 'client': {
          await this.prismaService.userClient.update({
            where: {
              id: item.entity_id,
            },
            data: {
              active_orders_count: activeOrdersCount,
              completed_orders_count: completedOrdersCount,
              total_orders_count: totalOrdersCount,
            },
          });
          break;
        }
      }
    }
  }
}


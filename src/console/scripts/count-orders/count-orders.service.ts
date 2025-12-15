import { Injectable } from '@nestjs/common';
import { countOrders } from 'src/generated/prisma/sql';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class CountOrdersService {
  constructor(private prismaService: PrismaService) {}

  public async countOrders() {
    const result = await this.prismaService.$queryRawTyped(countOrders());

    for (const item of result) {
      if (!item.entityId) {
        continue;
      }

      const activeOrdersCount = Number(item.activeCount);
      const completedOrdersCount = Number(item.completedCount);
      const totalOrdersCount = activeOrdersCount + completedOrdersCount;

      switch (item.entityType) {
        case 'courier': {
          await this.prismaService.userCourier.update({
            where: {
              id: item.entityId,
            },
            data: {
              activeOrdersCount,
              completedOrdersCount,
              totalOrdersCount,
            },
          });
          break;
        }
        case 'client': {
          await this.prismaService.userClient.update({
            where: {
              id: item.entityId,
            },
            data: {
              activeOrdersCount,
              completedOrdersCount,
              totalOrdersCount,
            },
          });
          break;
        }
      }
    }
  }
}


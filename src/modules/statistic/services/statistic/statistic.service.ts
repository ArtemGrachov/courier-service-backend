import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { EOrderStatus } from 'src/modules/orders/constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import type { IStatsRecord } from '../../types/stats-record';

@Injectable()
export class StatisticService {
  constructor(private prismaService: PrismaService) {}

  public async last30DaysOrdersStatistic() {
    const orders = await this.prismaService.order.findMany({
      where: {
        OR: [
          {
            ordered_at: {
              gte: dayjs().subtract(30, 'day').toDate(),
            },
          },
          {
            completed_at: {
              gte: dayjs().subtract(30, 'day').toDate(),
            },
          }
        ]
      }
    });

    const statistic = orders.reduce((acc, curr) => {
      const { completed_at: completedAt, ordered_at: orderedAt, status } = curr;

      const orderedDay = dayjs(orderedAt).format('YYYY.MM.DD');
      const orderedDayData = acc[orderedDay] || (acc[orderedDay] = {});

      orderedDayData.ordered = (orderedDayData.ordered ?? 0) + 1;

      if (completedAt) {
        const completedDay = dayjs(completedAt).format('YYYY.MM.DD');
        const completedDayData = acc[completedDay] || (acc[completedDay] = {});

        switch (status) {
          case EOrderStatus.COMPLETED: {
            completedDayData.completed = (completedDayData.completed ?? 0) + 1;
            break;
          }
          case EOrderStatus.CANCELLED: {
            completedDayData.cancelled = (completedDayData.cancelled ?? 0) + 1;
            break;
          }
        }
      }

      return acc;
    }, {} as Record<string, IStatsRecord>);

    const sortedKeys = Object.keys(statistic).sort((a, b) => dayjs(a).isBefore(b) ? 1 : dayjs(a).isAfter(b) ? -1 : 0);

    const sortedStatistic = sortedKeys.reduce((acc, curr) => {
      acc[curr] = statistic[curr];
      return acc;
    }, {} as Record<string, IStatsRecord>);

    return {
      statistic: sortedStatistic,
    };
  }
}

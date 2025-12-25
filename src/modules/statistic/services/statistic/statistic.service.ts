import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { EOrderStatus } from 'src/modules/orders/constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import type { IStatsRecord } from '../../types/stats-record';

@Injectable()
export class StatisticService {
  constructor(private prismaService: PrismaService) {}

  public async last30DaysOrdersStatistic() {
    const rangeFrom = dayjs().subtract(30, 'day');
    const rangeFromDate = rangeFrom.toDate();
    const orders = await this.prismaService.order.findMany({
      where: {
        OR: [
          {
            ordered_at: {
              gte: rangeFromDate,
            },
          },
          {
            completed_at: {
              gte: rangeFromDate,
            },
          }
        ]
      }
    });

    const statistic = orders.reduce((acc, curr) => {
      const { completed_at: completedAt, ordered_at: orderedAt, status } = curr;

      const orderedDay = dayjs(orderedAt);

      if (orderedDay.isSame(rangeFrom) || orderedDay.isAfter(rangeFrom)) {
        const orderedDayKey = orderedDay.format('YYYY.MM.DD');
        const orderedDayData = acc[orderedDayKey] || (acc[orderedDayKey] = {});

        orderedDayData.ordered = (orderedDayData.ordered ?? 0) + 1;
      }

      if (completedAt) {
        const completedDayKey = dayjs(completedAt).format('YYYY.MM.DD');
        const completedDayData = acc[completedDayKey] || (acc[completedDayKey] = {});

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

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class CountRatingsService {
  constructor(private prismaService: PrismaService) {}

  public async countCourierRatings() {
    const ratings = await this.prismaService.courierRate.groupBy({
      by: ['courier_id'],
      _avg: {
        rating: true,
      },
      _count: {
        _all: true,
      },
    })

    for (let item of ratings) {
      await this.prismaService.userCourier.update({
        where: {
          id: item.courier_id,
        },
        data: {
          rating: item._avg.rating,
          rating_count: item._count._all,
        },
      });
    }
  }

  public async countClientRatings() {
    const ratings = await this.prismaService.clientRate.groupBy({
      by: ['client_id'],
      _avg: {
        rating: true,
      },
      _count: {
        _all: true,
      },
    })

    for (let item of ratings) {
      await this.prismaService.userClient.update({
        where: {
          id: item.client_id,
        },
        data: {
          rating: item._avg.rating,
          rating_count: item._count._all,
        },
      });
    }
  }
}


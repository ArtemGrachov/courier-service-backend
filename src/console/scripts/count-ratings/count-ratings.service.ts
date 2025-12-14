import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class CountRatingsService {
  constructor(private prismaService: PrismaService) {}

  public async countCourierRatings() {
    const ratings = await this.prismaService.courierRate.groupBy({
      by: ['courierId'],
      _avg: {
        rating: true,
      },
    })

    for (let item of ratings) {
      await this.prismaService.userCourier.update({
        where: {
          id: item.courierId,
        },
        data: {
          rating: item._avg.rating,
        },
      });
    }
  }

  public async countClientRatings() {
    const ratings = await this.prismaService.clientRate.groupBy({
      by: ['clientId'],
      _avg: {
        rating: true,
      },
    })

    for (let item of ratings) {
      await this.prismaService.userClient.update({
        where: {
          id: item.clientId,
        },
        data: {
          rating: item._avg.rating,
        },
      });
    }
  }
}


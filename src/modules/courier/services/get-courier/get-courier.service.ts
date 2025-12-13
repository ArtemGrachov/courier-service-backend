import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class GetCourierService {
  constructor(private prismaService: PrismaService) {}

  public async getCourier(id: number) {
    const courier = await this.prismaService.userCourier.findUnique({
      where: { id },
      include: {
        position: true,
      },
    });

    return courier;
  }
}

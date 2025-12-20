import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { UpdatePositionDto } from '../../dto/update-position.dto';

@Injectable()
export class UpdatePositionService {
  constructor(private prismaService: PrismaService) {}

  public async updateCourierPosition(courierId: number, payload: UpdatePositionDto) {
    const courier = await this.prismaService.userCourier.findUnique({
      where: {
        id: courierId,
      },
    });

    if (!courier) {
      throw new NotFoundException();
    }

    const position = await this.prismaService.position.update({
      where: {
        id: courier.id,
      },
      data: payload,
    });

    return position;
  }
}

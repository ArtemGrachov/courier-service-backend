import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { UpdateCourierDto } from '../../dto/update-courier.dto';

@Injectable()
export class UpdateCourierService {
  constructor(private prismaService: PrismaService) {}

  public async updateCourier(id: number, payload: UpdateCourierDto) {
    const courier = await this.prismaService.userCourier.update({
      where: {
        id,
      },
      data: payload,
    });

    return courier;
  }
}


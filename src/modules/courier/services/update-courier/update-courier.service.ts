import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';

import { UpdateCourierDto } from '../../dto/update-courier.dto';

@Injectable()
export class UpdateCourierService {
  constructor(
    private prismaService: PrismaService,
    private passwordService: PasswordService,
  ) {}

  public async updateCourier(id: number, payload: UpdateCourierDto) {
    const passwordHash = payload.password ?  await this.passwordService.generatePasswordHash(payload.password) : undefined;

    const courier = await this.prismaService.userCourier.update({
      where: {
        id,
      },
      data: {
        email: payload.email,
        name: payload.name,
        password_hash: passwordHash,
      },
    });

    return courier;
  }
}


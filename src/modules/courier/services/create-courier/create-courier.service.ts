import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';

import { CreateCourierDto } from '../../dto/create-courier.dto';

@Injectable()
export class CreateCourierService {
  constructor(
    private passwordService: PasswordService,
    private prismaService: PrismaService,
  ) {}

  public async createCourier({ name, email, phone, password }: CreateCourierDto) {
    const passwordHash = password ? await this.passwordService.generatePasswordHash(password) : '';

    const courier = await this.prismaService.userCourier.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        position: {
          create: {
            lat: 0,
            lng: 0,
          },
        },
      },
    });

    return courier;
  }
}


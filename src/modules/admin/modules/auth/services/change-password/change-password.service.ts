import { Injectable } from '@nestjs/common';

import { PasswordService } from 'src/modules/password/services/password/password.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class ChangePasswordService {
  constructor(
    private passwordService: PasswordService,
    private prismaService: PrismaService,
  ) {}

  async changePassword(userId: number, password: string) {
    const passwordHash = await this.passwordService.generatePasswordHash(password);

    await this.prismaService.userAdmin.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
      }
    });
  }
}


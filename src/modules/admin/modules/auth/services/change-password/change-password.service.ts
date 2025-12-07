import { Injectable } from '@nestjs/common';
import { AuthUuidService } from 'src/modules/auth/services/auth-uuid/auth-uuid.service';

import { PasswordService } from 'src/modules/password/services/password/password.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class ChangePasswordService {
  constructor(
    private passwordService: PasswordService,
    private prismaService: PrismaService,
    private authUuidService: AuthUuidService,
  ) {}

  async changePassword(userId: number, password: string) {
    const passwordHash = await this.passwordService.generatePasswordHash(password);

    const user = await this.prismaService.userAdmin.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
      },
    });

    this.authUuidService.update(userId);

    return user;
  }
}


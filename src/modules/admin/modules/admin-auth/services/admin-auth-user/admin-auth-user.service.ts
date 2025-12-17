import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { AbstractUserService } from 'src/modules/user-auth/services/abstract-user/abstract-user.service';

@Injectable()
export class AdminAuthUserService extends AbstractUserService {
  constructor(private prismaService: PrismaService) {
    super();
  }

  public async userByEmail(email: string) {
    return this.prismaService.userAdmin.findUnique({
      where: { email },
      omit: { password_hash: false },
    });
  }

  public async userById(id: number) {
    return this.prismaService.userAdmin.findUnique({
      where: { id },
      omit: { password_hash: false },
    });
  }

  public async updatePassword(id: number, passwordHash: string) {
    return this.prismaService.userAdmin.update({
      where: {
        id,
      },
      data: {
        password_hash: passwordHash,
      }
    });
  }
}

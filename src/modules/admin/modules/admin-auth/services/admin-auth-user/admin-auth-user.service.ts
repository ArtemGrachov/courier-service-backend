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
      omit: { passwordHash: false },
    });
  }

  public async userById(id: number) {
    return this.prismaService.userAdmin.findUnique({
      where: { id },
      omit: { passwordHash: false },
    });
  }

  public async updatePassword(id: number, passwordHash: string) {
    return this.prismaService.userAdmin.update({
      where: {
        id,
      },
      data: {
        passwordHash,
      }
    });
  }
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { AbstractUserService } from 'src/modules/user-auth/services/abstract-user/abstract-user.service';

@Injectable()
export class ClientAuthUserService extends AbstractUserService {
  constructor(private prismaService: PrismaService) {
    super();
  }

  public async userByEmail(email: string) {
    return this.prismaService.userClient.findUnique({ where: { email } });
  }

  public async userById(id: number) {
    return this.prismaService.userClient.findUnique({ where: { id } });
  }

  public async updatePassword(id: number, passwordHash: string) {
    return this.prismaService.userClient.update({
      where: {
        id,
      },
      data: {
        passwordHash,
      }
    });
  }
}

import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { AbstractUserService } from '../abstract-user/abstract-user.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { TokenService } from 'src/modules/token/services/token/token.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';

import { IncorrectResetTokenException } from '../../exceptions/incorrect-reset-token.exception';

@Injectable()
export class ResetPasswordService {
  constructor(
    private tokenService: TokenService,
    private prismaService: PrismaService,
    private passwordService: PasswordService,
    private userService: AbstractUserService,
  ) {}

  public async resetPassword(token: string, password: string) {
    const hash = this.tokenService.hashToken(token);

    const resetToken = await this.prismaService.resetPasswordToken.findFirst({
      where: {
        token: hash,
      },
    });

    if (!resetToken) {
      throw new IncorrectResetTokenException();
    }

    if (dayjs().isAfter(resetToken.expires)) {
      throw new IncorrectResetTokenException();
    }

    const userId = resetToken.userId;

    const user = await this.userService.userById(userId);

    if (!user) {
      throw new IncorrectResetTokenException();
    }

    await this.prismaService.resetPasswordToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    const passwordHash = await this.passwordService.generatePasswordHash(password);

    await this.prismaService.userAdmin.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
      },
    });
  }
}


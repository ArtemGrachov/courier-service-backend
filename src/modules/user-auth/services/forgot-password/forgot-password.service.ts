import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dayjs, { ManipulateType } from 'dayjs';

import { ENV_VARS } from 'src/constants/env';

import { AbstractUserService } from '../abstract-user/abstract-user.service';
import { MailService } from 'src/modules/mail/services/mail/mail.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { TokenService } from 'src/modules/token/services/token/token.service';

@Injectable()
export class ForgotPasswordService {
  static readonly TOKEN_LIFETIME = {
    VALUE: 10,
    UNITS: 'minutes',
  };

  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private mailService: MailService,
    private tokenService: TokenService,
    private userService: AbstractUserService,
  ) {}

  public async forgotPassword(email: string) {
    const user = await this.userService.userByEmail(email);

    if (!user) {
      return;
    }

    const resetToken = this.tokenService.createToken();
    const hashedToken = this.tokenService.hashToken(resetToken);

    const expires = dayjs()
      .add(ForgotPasswordService.TOKEN_LIFETIME.VALUE, ForgotPasswordService.TOKEN_LIFETIME.UNITS as ManipulateType)
      .toDate()
      .getTime();

    await this.prismaService.resetPasswordToken.create({
      data: {
        token: hashedToken,
        expires,
        userId: user.id,
      },
    });

    const from = this.configService.get(ENV_VARS.MAIL_FROM);
    const resetPasswordLink = this.configService.get(ENV_VARS.RESET_PASSWORD_LINK);
    const text = `Password reset link: ${resetPasswordLink.replace('__TOKEN__', resetToken)}`;

    await this.mailService.sendEmail(from, email, 'Password reset link', text);
  }
}


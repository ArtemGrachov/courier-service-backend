import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';
import { AuthTokenService } from '../auth-token/auth-token.service';

import { IncorrectEmailOrPasswordException } from '../../exceptions/incorrect-email-or-password.exception';

@Injectable()
export class LoginService {
  constructor(
    private prismaService: PrismaService,
    private passwordService: PasswordService,
    private authTokenService: AuthTokenService,
  ) {}

  public async login(email: string, password: string) {
    const user = await this.prismaService.userAdmin.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new IncorrectEmailOrPasswordException();
    }

    const isPasswordValid = await this.passwordService.comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new IncorrectEmailOrPasswordException();
    }

    return {
      token: await this.authTokenService.authToken(user),
    };
  }
}


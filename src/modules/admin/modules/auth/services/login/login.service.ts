import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

import { ENV_VARS } from 'src/constants/env';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';

import { IncorrectEmailOrPasswordException } from '../../exceptions/incorrect-email-or-password.exception';

@Injectable()
export class LoginService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private passwordService: PasswordService,
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

    const jwtSecretKey = this.configService.get(ENV_VARS.JWT_SECRET_KEY) as string;

    const token = jwt.sign({ id: user.id, email: user.email, role: 'admin' }, jwtSecretKey, { expiresIn: '1h' });

    return { token };
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';

import { IncorrectEmailOrPasswordException } from '../../exceptions/incorrect-email-or-password.exception';

@Injectable()
export class LoginService {
  constructor(
    private prismaService: PrismaService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
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

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: 'admin',
      sessionUuid: user.sessionUuid,
    }, { expiresIn: '1h' });

    return { token };
  }
}


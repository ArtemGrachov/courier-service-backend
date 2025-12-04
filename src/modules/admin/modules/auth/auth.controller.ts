import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

import { ENV_VARS } from 'src/constants/env';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';

import { LoginDto } from './dto/login.dto';
import { IncorrectEmailOrPasswordException } from './exceptions/incorrect-email-or-password.exception';

@Controller('admin/auth')
export class AuthController {
  constructor(
    private prismaService: PrismaService,
    private passwordService: PasswordService,
    private configService: ConfigService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async login(@Body() { email, password }: LoginDto) {
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


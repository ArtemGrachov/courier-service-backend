import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ENV_VARS } from 'src/constants/env';

import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PasswordModule } from 'src/modules/password/password.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { TokenModule } from 'src/modules/token/token.module';

import { AuthController } from './auth.controller';

import { ForgotPasswordService } from './services/forgot-password/forgot-password.service';
import { LoginService } from './services/login/login.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { ChangePasswordService } from './services/change-password/change-password.service';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    PasswordModule,
    ConfigModule,
    MailModule,
    TokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARS.JWT_SECRET_KEY),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ForgotPasswordService, LoginService, ResetPasswordService, ChangePasswordService],
})
export class AuthModule {}

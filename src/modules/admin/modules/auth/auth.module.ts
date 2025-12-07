import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule as CoreAuthModule } from 'src/modules/auth/auth.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PasswordModule } from 'src/modules/password/password.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { TokenModule } from 'src/modules/token/token.module';

import { AuthController } from './auth.controller';

import { ForgotPasswordService } from './services/forgot-password/forgot-password.service';
import { LoginService } from './services/login/login.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { ChangePasswordService } from './services/change-password/change-password.service';
import { AuthTokenService } from './services/auth-token/auth-token.service';

@Module({
  controllers: [AuthController],
  imports: [
    CoreAuthModule,
    PrismaModule,
    PasswordModule,
    ConfigModule,
    MailModule,
    TokenModule,
  ],
  providers: [ForgotPasswordService, LoginService, ResetPasswordService, ChangePasswordService, AuthTokenService],
})
export class AuthModule {}


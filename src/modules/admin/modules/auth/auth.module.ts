import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PasswordModule } from 'src/modules/password/password.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { TokenModule } from 'src/modules/token/token.module';

import { AuthController } from './auth.controller';
import { ForgotPasswordService } from './services/forgot-password/forgot-password.service';
import { LoginService } from './services/login/login.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule, PasswordModule, ConfigModule, MailModule, TokenModule],
  providers: [ForgotPasswordService, LoginService, ResetPasswordService],
})
export class AuthModule {}

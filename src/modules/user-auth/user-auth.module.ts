import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from 'src/modules/auth/auth.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PasswordModule } from 'src/modules/password/password.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { TokenModule } from 'src/modules/token/token.module';

import { AuthTokenService } from './services/auth-token/auth-token.service';
import { AbstractUserService } from './services/abstract-user/abstract-user.service';
import { ForgotPasswordService } from './services/forgot-password/forgot-password.service';
import { LoginService } from './services/login/login.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { ChangePasswordService } from './services/change-password/change-password.service';

import type { IUserModuleOptions } from './types/user-module-options';

@Module({})
export class UserAuthModule {
  static register(options: IUserModuleOptions): DynamicModule {
    const imports = [
      ...(options.imports ?? []),
      AuthModule,
      PrismaModule,
      PasswordModule,
      ConfigModule,
      MailModule,
      TokenModule,
    ];

    const providers = [
      ...(options.providers ?? []),
      {
        provide: AbstractUserService,
        useClass: options.useUserServiceClass,
      },
      AuthTokenService,
      ForgotPasswordService,
      LoginService,
      ResetPasswordService,
      ChangePasswordService,
      AuthTokenService,
    ];

    return {
      module: UserAuthModule,
      imports,
      providers,
      exports: providers,
    };
  }
}


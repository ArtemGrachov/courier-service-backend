import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { ENV_VARS } from 'src/constants/env';

import { AuthGuard } from './guards/auth/auth.guard';
import { RoleGuard } from './guards/role/role.guard';
import { AuthUuidService } from './services/auth-uuid/auth-uuid.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARS.JWT_SECRET_KEY),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AuthUuidService,
  ],
  exports: [
    JwtModule,
    AuthUuidService,
  ],
})
export class AuthModule {}

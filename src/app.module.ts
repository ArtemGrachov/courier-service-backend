import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AdminModule } from './modules/admin/admin.module';

import { AuthGuard } from './guards/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}

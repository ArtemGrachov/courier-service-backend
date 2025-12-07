import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdminModule } from './modules/admin/admin.module';

import { AuthModule } from './modules/auth/auth.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    AuthModule,
    UserAuthModule,
  ],
})
export class AppModule {}

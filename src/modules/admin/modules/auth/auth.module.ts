import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PasswordModule } from 'src/modules/password/password.module';

import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule, PasswordModule, ConfigModule],
})
export class AuthModule {}

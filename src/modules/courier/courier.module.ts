import { Module } from '@nestjs/common';

import { CourierAuthModule } from './modules/courier-auth/courier-auth.module';
import { PasswordModule } from '../password/password.module';
import { PrismaModule } from '../prisma/prisma.module';

import { CreateCourierService } from './services/create-courier/create-courier.service';

import { CourierController } from './courier.controller';

@Module({
  imports: [CourierAuthModule, PasswordModule, PrismaModule],
  controllers: [CourierController],
  providers: [CreateCourierService],
})
export class CourierModule {}


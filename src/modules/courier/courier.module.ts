import { Module } from '@nestjs/common';

import { CourierAuthModule } from './modules/courier-auth/courier-auth.module';
import { PasswordModule } from '../password/password.module';
import { PrismaModule } from '../prisma/prisma.module';

import { CreateCourierService } from './services/create-courier/create-courier.service';

import { CourierController } from './courier.controller';
import { GetCouriersService } from './services/get-couriers/get-couriers.service';
import { UpdateCourierService } from './services/update-courier/update-courier.service';

@Module({
  imports: [CourierAuthModule, PasswordModule, PrismaModule],
  controllers: [CourierController],
  providers: [CreateCourierService, GetCouriersService, UpdateCourierService],
})
export class CourierModule {}


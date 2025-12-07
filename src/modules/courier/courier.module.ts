import { Module } from '@nestjs/common';
import { CourierAuthModule } from './modules/courier-auth/courier-auth.module';

@Module({
  imports: [CourierAuthModule],
})
export class CourierModule {}

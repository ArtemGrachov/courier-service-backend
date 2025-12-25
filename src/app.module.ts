import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdminModule } from './modules/admin/admin.module';

import { AuthModule } from './modules/auth/auth.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';
import { CourierModule } from './modules/courier/courier.module';
import { ClientModule } from './modules/client/client.module';
import { OrdersModule } from './modules/orders/orders.module';
import { StatisticModule } from './modules/statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    AuthModule,
    UserAuthModule,
    CourierModule,
    ClientModule,
    OrdersModule,
    StatisticModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CreateOrderService } from './services/create-order/create-order.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GetOrdersService } from './services/get-orders/get-orders.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [CreateOrderService, GetOrdersService]
})
export class OrdersModule {}

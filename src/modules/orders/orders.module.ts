import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CreateOrderService } from './services/create-order/create-order.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GetOrdersService } from './services/get-orders/get-orders.service';
import { GetOrderService } from './services/get-order/get-order.service';
import { AcceptOrderService } from './services/accept-order/accept-order.service';
import { CompleteOrderService } from './services/complete-order/complete-order.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [CreateOrderService, GetOrdersService, GetOrderService, AcceptOrderService, CompleteOrderService]
})
export class OrdersModule {}

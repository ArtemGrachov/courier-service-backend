import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CreateOrderService } from './services/create-order/create-order.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [CreateOrderService]
})
export class OrdersModule {}

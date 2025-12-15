import { NestFactory } from '@nestjs/core';
import { CountOrdersModule } from './count-orders.module';
import { CountOrdersService } from './count-orders.service';

export default async function() {
  const application = await NestFactory.createApplicationContext(CountOrdersModule);
  const countOrdersService = application.get(CountOrdersService);

  await countOrdersService.countOrders();
}


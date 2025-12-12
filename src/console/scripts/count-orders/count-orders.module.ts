import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { CountOrdersService } from './count-orders.service';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  providers: [CountOrdersService]
})
export class CountOrdersModule {}


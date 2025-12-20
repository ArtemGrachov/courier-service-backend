import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { CountRatingsService } from './count-ratings.service';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  providers: [CountRatingsService]
})
export class CountRatingsModule {}


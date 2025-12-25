import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './services/statistic/statistic.service';

@Module({
  imports: [PrismaModule],
  controllers: [StatisticController],
  providers: [StatisticService]
})
export class StatisticModule {}

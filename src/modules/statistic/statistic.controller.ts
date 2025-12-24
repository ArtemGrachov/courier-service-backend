import { Controller, Get } from '@nestjs/common';
import { ERoles } from 'src/constants/auth';
import { StatisticService } from './services/statistic/statistic.service';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @Get('')
  @Roles([ERoles.ADMIN])
  public async getLast30DaysOrdersStatistic() {
    return this.statisticService.last30DaysOrdersStatistic();
  }
}


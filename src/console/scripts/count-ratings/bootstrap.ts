import { NestFactory } from '@nestjs/core';
import { CountRatingsModule } from './count-ratings.module';
import { CountRatingsService } from './count-ratings.service';

export default async function() {
  const application = await NestFactory.createApplicationContext(CountRatingsModule);
  const countRatingsService = application.get(CountRatingsService);

  await countRatingsService.countCourierRatings();
}


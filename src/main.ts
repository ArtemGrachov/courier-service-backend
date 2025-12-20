import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GeneralExceptionFilter } from './filters/general-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GeneralExceptionFilter(httpAdapterHost));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

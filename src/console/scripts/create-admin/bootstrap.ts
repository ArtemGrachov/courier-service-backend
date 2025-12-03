import { NestFactory } from '@nestjs/core';
import { CreateAdminModule } from './create-admin.module';
import { CreateAdminService } from './create-admin.service';

export default async function() {
  const application = await NestFactory.createApplicationContext(CreateAdminModule);
  const createAdminService = application.get(CreateAdminService);

  await createAdminService.createAdmin();
}


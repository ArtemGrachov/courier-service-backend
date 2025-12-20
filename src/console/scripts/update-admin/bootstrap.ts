import { NestFactory } from '@nestjs/core';
import { UpdateAdminModule } from './update-admin.module';
import { UpdateAdminService } from './update-admin.service';

export default async function() {
  const application = await NestFactory.createApplicationContext(UpdateAdminModule);
  const updateAdminService = application.get(UpdateAdminService);

  await updateAdminService.createAdmin();
}


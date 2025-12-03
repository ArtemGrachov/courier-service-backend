import { NestFactory } from '@nestjs/core';
import { CreateAdminModule } from './create-admin/create-admin.module';
import { CreateAdminService } from './create-admin/create-admin.service';

export default async function() {
  const application = await NestFactory.createApplicationContext(CreateAdminModule);
  application.get(CreateAdminService);
}


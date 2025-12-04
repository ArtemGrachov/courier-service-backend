import { NestFactory } from '@nestjs/core';
import { DeleteAdminModule } from './delete-admin.module';
import { DeleteAdminService } from './delete-admin.service';

export default async function() {
  const application = await NestFactory.createApplicationContext(DeleteAdminModule);
  const removeAdminService = application.get(DeleteAdminService);

  await removeAdminService.removeAdmin();
}


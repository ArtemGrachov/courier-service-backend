import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ParametersModule } from 'src/console/modules/parameters/parameters.module';
import { PasswordModule } from 'src/modules/password/password.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { DeleteAdminService } from './delete-admin.service';

@Module({
  imports: [ConfigModule.forRoot(), ParametersModule, PasswordModule, PrismaModule],
  providers: [DeleteAdminService]
})
export class DeleteAdminModule {}


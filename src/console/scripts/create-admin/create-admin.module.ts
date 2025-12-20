import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PasswordModule } from 'src/modules/password/password.module';
import { ParametersModule } from 'src/console/modules/parameters/parameters.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { CreateAdminService } from './create-admin.service';

@Module({
  imports: [ConfigModule.forRoot(), ParametersModule, PasswordModule, PrismaModule],
  providers: [CreateAdminService]
})
export class CreateAdminModule {}


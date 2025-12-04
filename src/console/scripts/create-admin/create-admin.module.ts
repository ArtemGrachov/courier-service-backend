import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PasswordModule } from 'src/modules/password/password.module';
import { ParametersModule } from 'src/console/modules/parameters/parameters.module';

import { CreateAdminService } from './create-admin.service';
import { PrismaService } from '../../../prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), ParametersModule, PasswordModule],
  providers: [PrismaService, CreateAdminService]
})
export class CreateAdminModule {}


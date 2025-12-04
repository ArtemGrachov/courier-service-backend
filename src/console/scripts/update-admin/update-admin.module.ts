import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ParametersModule } from 'src/console/modules/parameters/parameters.module';
import { PasswordModule } from 'src/modules/password/password.module';

import { UpdateAdminService } from './update-admin.service';
import { PrismaService } from '../../../prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), ParametersModule, PasswordModule],
  providers: [PrismaService, UpdateAdminService]
})
export class UpdateAdminModule {}


import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PasswordModule } from 'src/modules/password/password.module';

import { CreateAdminService } from './create-admin.service';
import { PrismaService } from '../../../prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), PasswordModule],
  providers: [PrismaService, CreateAdminService]
})
export class CreateAdminModule {}


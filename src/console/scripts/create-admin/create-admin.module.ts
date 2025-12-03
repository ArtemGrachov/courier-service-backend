import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CreateAdminService } from './create-admin.service';
import { PrismaService } from '../../../prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PrismaService, CreateAdminService]
})
export class CreateAdminModule {}


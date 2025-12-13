import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { ClientAuthModule } from './modules/client-auth/client-auth.module';
import { GetClientService } from './services/get-client/get-client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [ClientAuthModule, PrismaModule],
  providers: [GetClientService],
  controllers: [ClientController],
})
export class ClientModule {}

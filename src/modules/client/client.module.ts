import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { ClientAuthModule } from './modules/client-auth/client-auth.module';
import { GetClientService } from './services/get-client/get-client.service';
import { ClientController } from './client.controller';
import { GetClientsService } from './services/get-clients/get-clients.service';

@Module({
  imports: [ClientAuthModule, PrismaModule],
  providers: [GetClientService, GetClientsService],
  controllers: [ClientController],
})
export class ClientModule {}

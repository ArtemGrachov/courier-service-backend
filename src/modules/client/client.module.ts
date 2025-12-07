import { Module } from '@nestjs/common';
import { ClientAuthModule } from './modules/client-auth/client-auth.module';

@Module({
  imports: [ClientAuthModule]
})
export class ClientModule {}

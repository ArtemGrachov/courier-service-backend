import { Module } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';

import { UserAuthModule } from 'src/modules/user-auth/user-auth.module';
import { ClientAuthUserService } from './services/client-auth-user/client-auth-user.service';
import { ClientAuthController } from './client-auth.controller';

@Module({
  imports: [
    UserAuthModule.register({
      useUserServiceClass: ClientAuthUserService,
      userRole: ERoles.CLIENT,
    }),
  ],
  controllers: [ClientAuthController],
})
export class ClientAuthModule {}

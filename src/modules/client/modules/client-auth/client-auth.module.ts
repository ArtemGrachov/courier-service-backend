import { Module } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';

import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PasswordModule } from 'src/modules/password/password.module';

import { UserAuthModule } from 'src/modules/user-auth/user-auth.module';
import { ClientAuthUserService } from './services/client-auth-user/client-auth-user.service';
import { ClientRegistrationService } from './services/client-registration/client-registration.service';

import { ClientAuthController } from './client-auth.controller';

@Module({
  imports: [
    PrismaModule,
    PasswordModule,
    UserAuthModule.register({
      useUserServiceClass: ClientAuthUserService,
      userRole: ERoles.CLIENT,
    }),
  ],
  controllers: [ClientAuthController],
  providers: [ClientRegistrationService],
})
export class ClientAuthModule {}

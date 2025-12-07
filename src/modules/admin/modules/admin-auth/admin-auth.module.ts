import { Module } from '@nestjs/common';

import { UserAuthModule } from 'src/modules/user-auth/user-auth.module';
import { AdminAuthUserService } from './services/admin-auth-user/admin-auth-user.service';
import { AdminAuthController } from './admin-auth.controller';

@Module({
  imports: [
    UserAuthModule.register({
      useUserServiceClass: AdminAuthUserService,
    }),
  ],
  controllers: [AdminAuthController]
})
export class AdminAuthModule {}

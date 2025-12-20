import { Module } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';

import { UserAuthModule } from 'src/modules/user-auth/user-auth.module';
import { CourierAuthController } from './courier-auth.controller';
import { CourierAuthUserService } from './service/courier-auth-user/courier-auth-user.service';

@Module({
  imports: [
    UserAuthModule.register({
      useUserServiceClass: CourierAuthUserService,
      userRole: ERoles.COURIER,
    }),
  ],
  controllers: [CourierAuthController],
})
export class CourierAuthModule {}

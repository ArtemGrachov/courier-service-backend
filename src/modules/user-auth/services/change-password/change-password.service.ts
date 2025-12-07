import { Injectable } from '@nestjs/common';
import { AuthUuidService } from 'src/modules/auth/services/auth-uuid/auth-uuid.service';

import { PasswordService } from 'src/modules/password/services/password/password.service';
import { AbstractUserService } from '../abstract-user/abstract-user.service';

@Injectable()
export class ChangePasswordService {
  constructor(
    private passwordService: PasswordService,
    private userService: AbstractUserService,
    private authUuidService: AuthUuidService,
  ) {}

  async changePassword(userId: number, password: string) {
    const passwordHash = await this.passwordService.generatePasswordHash(password);

    const user = await this.userService.updatePassword(userId, passwordHash)

    this.authUuidService.update(userId);

    return user;
  }
}


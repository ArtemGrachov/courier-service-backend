import { Injectable } from '@nestjs/common';

import { AbstractUserService } from '../abstract-user/abstract-user.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';
import { AuthTokenService } from '../auth-token/auth-token.service';

import { IncorrectEmailOrPasswordException } from '../../exceptions/incorrect-email-or-password.exception';

@Injectable()
export class LoginService {
  constructor(
    private userService: AbstractUserService,
    private passwordService: PasswordService,
    private authTokenService: AuthTokenService,
  ) {}

  public async login(email: string, password: string) {
    const user = await this.userService.userByEmail(email);

    if (!user) {
      throw new IncorrectEmailOrPasswordException(email);
    }

    const isPasswordValid = await this.passwordService.comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      throw new IncorrectEmailOrPasswordException(email);
    }

    return {
      token: await this.authTokenService.authToken(user),
    };
  }
}


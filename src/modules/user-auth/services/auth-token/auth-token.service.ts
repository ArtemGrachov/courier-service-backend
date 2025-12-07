import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ERoles } from 'src/constants/auth';

import { AuthUuidService } from 'src/modules/auth/services/auth-uuid/auth-uuid.service';

import type { IAbstractUser } from '../../types/abstract-user';

@Injectable()
export class AuthTokenService {
  constructor(
    private jwtService: JwtService,
    private authUuidService: AuthUuidService,
  ) {}

  public async authToken(user: IAbstractUser) {
    const token = await this.jwtService.signAsync({
      id: user.id!,
      email: user.email!,
      role: ERoles.ADMIN,
      authUuid: this.authUuidService.get(user.id!),
    }, { expiresIn: '1h' });

    return token;
  }
}


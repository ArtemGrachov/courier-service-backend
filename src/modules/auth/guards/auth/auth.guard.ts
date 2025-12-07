import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { ENV_VARS } from 'src/constants/env';

import { AuthUuidService } from '../../services/auth-uuid/auth-uuid.service';

import type { IRequstUser } from 'src/types/auth/request-user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private authUuidService: AuthUuidService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync<IRequstUser>(
          token,
          {
            secret: this.configService.get<string>(ENV_VARS.JWT_SECRET_KEY),
          },
        );

        const compareUuid = this.authUuidService.get(payload.id);

        if (payload.authUuid !== compareUuid) {
          throw new UnauthorizedException();
        }

        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}


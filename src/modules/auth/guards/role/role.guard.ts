import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ERoles } from 'src/constants/auth';

import { Roles } from '../../decorators/role.decorator';

import type { IRequstUser } from 'src/types/auth/request-user';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ) {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as IRequstUser | undefined;

    return roles.includes(user?.role ?? ERoles.GUEST);
  }
}


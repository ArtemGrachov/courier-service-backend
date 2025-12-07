import { ModuleMetadata, Type } from '@nestjs/common';
import { AbstractUserService } from '../services/abstract-user/abstract-user.service';
import { ERoles } from 'src/constants/auth';

export interface IUserModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  providers?: any[];
  useUserServiceClass: Type<AbstractUserService>;
  userRole: ERoles;
}


import { Reflector } from '@nestjs/core';

import { ERoles } from 'src/constants/auth';

export const Roles = Reflector.createDecorator<ERoles[]>();


import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class UserAlreadyExistsException extends ApiErrorResponse {
  constructor(email: string) {
    super(
      HttpStatus.UNPROCESSABLE_ENTITY,
      'USER_ALREADY_EXISTS',
      `User with email ${email} already exists`,
      { email },
    );
  }
}


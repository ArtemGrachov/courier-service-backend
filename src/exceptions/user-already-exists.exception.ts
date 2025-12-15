import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class UserAlreadyExistsException extends ApiErrorResponse {
  constructor(email: string) {
    super(
      HttpStatus.BAD_REQUEST,
      'USER_ALREADY_EXISTS',
      `User with email "${email}" already exists`,
      {
        email,
      },
    );
  }
}


import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class IncorrectEmailOrPasswordException extends ApiErrorResponse {
  constructor(email: string) {
    super(
      HttpStatus.UNPROCESSABLE_ENTITY,
      'INCORRECT_EMAIL_OR_PASSWORD',
      'Incorrect email or password',
      { email },
    );
  }
}


import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class IncorrectResetTokenException extends ApiErrorResponse {
  constructor() {
    super(
      HttpStatus.UNPROCESSABLE_ENTITY,
      'INCORRECT_RESET_TOKEN',
      'Incorrect reset token',
    );
  }
}


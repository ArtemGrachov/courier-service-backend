import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectResetTokenException extends HttpException {
  constructor() {
    super('INCORRECT_RESET_TOKEN', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}


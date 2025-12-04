import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectEmailOrPasswordException extends HttpException {
  constructor() {
    super('INCORRECT_EMAIL_OR_PASSWORD', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}


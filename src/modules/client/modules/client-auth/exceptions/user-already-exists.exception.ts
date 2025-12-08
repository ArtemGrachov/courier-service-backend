import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('USER_ALREADY_EXISTS', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}


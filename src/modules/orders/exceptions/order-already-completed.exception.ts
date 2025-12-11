import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderAlreadyCompletedException extends HttpException {
  constructor() {
    super('ORDER_ALREADY_COMPLETED', HttpStatus.BAD_REQUEST);
  }
}


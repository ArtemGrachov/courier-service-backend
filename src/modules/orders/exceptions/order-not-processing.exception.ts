import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotProcessingException extends HttpException {
  constructor() {
    super('ORDER_NOT_PROCESSING', HttpStatus.BAD_REQUEST);
  }
}


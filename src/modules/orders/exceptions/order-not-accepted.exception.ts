import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotAcceptedException extends HttpException {
  constructor() {
    super('ORDER_NOT_ACCEPTED', HttpStatus.BAD_REQUEST);
  }
}


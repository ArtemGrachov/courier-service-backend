import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderAlreadyAcceptedException extends HttpException {
  constructor() {
    super('ORDER_ALREADY_ACCEPTED', HttpStatus.BAD_REQUEST);
  }
}


import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class OrderNotAcceptedException extends ApiErrorResponse {
  constructor(orderId: number) {
    super(
      HttpStatus.BAD_REQUEST,
      'ORDER_NOT_ACCEPTED',
      `Order "${orderId}" is not accepted`,
      {
        orderId,
      },
    );
  }
}


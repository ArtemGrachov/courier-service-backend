import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class OrderNotCompletedException extends ApiErrorResponse {
  constructor(orderId: number) {
    super(
      HttpStatus.BAD_REQUEST,
      'ORDER_NOT_COMPLETED',
      `Order "${orderId}" is completed yet`,
      {
        orderId,
      },
    );
  }
}


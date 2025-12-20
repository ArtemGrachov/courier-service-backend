import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class OrderAlreadyCompletedException extends ApiErrorResponse {
  constructor(orderId: number) {
    super(
      HttpStatus.BAD_REQUEST,
      'ORDER_ALREADY_COMPLETED',
      `Order "${orderId}" is already completed`,
      {
        orderId,
      },
    );
  }
}


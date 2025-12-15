import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class OrderAlreadyCancelledException extends ApiErrorResponse {
  constructor(orderId: number) {
    super(
      HttpStatus.BAD_REQUEST,
      'ORDER_ALREADY_CANCELLED',
      `Order "${orderId}" is already cancelled`,
      {
        orderId,
      },
    );
  }
}


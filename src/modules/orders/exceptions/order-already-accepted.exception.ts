import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class OrderAlreadyAcceptedException extends ApiErrorResponse {
  constructor(orderId: number) {
    super(
      HttpStatus.BAD_REQUEST,
      'ORDER_ALREADY_ACCEPTED',
      'Order "${orderId}" is already accepted',
      { orderId },
    );
  }
}


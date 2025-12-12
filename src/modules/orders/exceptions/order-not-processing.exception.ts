import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class OrderNotProcessingException extends ApiErrorResponse {
  constructor(orderId: number) {
    super(
      HttpStatus.BAD_REQUEST,
      'ORDER_NOT_PROCESSING',
      'Order "${orderId}" is not processing',
      {
        orderId,
      },
    );
  }
}


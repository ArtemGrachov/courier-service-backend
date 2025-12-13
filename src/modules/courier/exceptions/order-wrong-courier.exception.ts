import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from 'src/responses/response';

export class OrderWrongCourierException extends ApiErrorResponse {
  constructor(orderId: number, courierId: number) {
    super(
      HttpStatus.BAD_REQUEST,
      'ORDER_WRONG_COURIER',
      `Courier "${courierId}" is not related to the order "${orderId}"`,
      {
        orderId,
        courierId,
      },
    );
  }
}


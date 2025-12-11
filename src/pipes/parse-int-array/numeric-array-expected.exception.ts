import { HttpExceptionOptions, UnprocessableEntityException } from '@nestjs/common';

export class NumericArrayExpected extends UnprocessableEntityException {
  constructor(objectOrError?: any, descriptionOrOptions? : string | HttpExceptionOptions) {
    super(objectOrError, descriptionOrOptions ?? 'Validation failed (numeric array is expected)');
  }
}

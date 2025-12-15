import { BadRequestException, ValidationError } from '@nestjs/common';

export const exceptionFactory = (validationErrors: ValidationError[] = []) => {
  return new BadRequestException(
    validationErrors.map((error) => ({
      field: error.property,
      error: Object.values(error.constraints as any).join(', '),
    })),
  );
}


import { HttpException } from "@nestjs/common";

export class ApiResponse<T = undefined> {
  constructor(
    public type: 'error' | 'success' = 'success',
    public statusCode: number,
    public code: string,
    public message: string,
    public details: T | undefined = undefined,
  ) {}
}

export class ApiErrorResponse<T = any> extends HttpException {
  constructor(statusCode: number, code: string, message: string, details: T | undefined = undefined) {
    super(
      {
        type: 'error',
        statusCode,
        code,
        message,
        details,
      },
      statusCode,
    )
  }
}


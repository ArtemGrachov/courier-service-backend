import { HttpException, HttpStatus } from "@nestjs/common";

export class ApiResponse<T = undefined> {
  constructor(
    public message: string,
    public code: string,
    public details: T | undefined = undefined,
    public type: 'error' | 'success' = 'success',
    public statusCode: number = HttpStatus.OK,
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


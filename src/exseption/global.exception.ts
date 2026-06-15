import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp: string;
  path: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ErrorResponse = {
      success: false,
      statusCode,
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        errorResponse.message = exceptionResponse;
      } else if (exceptionResponse && typeof exceptionResponse === 'object') {
        const exceptionData = exceptionResponse as {
          message?: string | string[];
          error?: string;
        };

        errorResponse.message = exceptionData.message ?? exception.message;

        errorResponse.error = exceptionData.error;
      }
    }

    errorResponse.statusCode = statusCode;

    response.status(statusCode).json(errorResponse);
  }
}

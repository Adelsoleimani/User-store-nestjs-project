import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  //  ورودی از نوع این
  T,
  //   خروجی از نوع این
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    // request چه چیزی دارد؟
    //    ||
    //   \ /
    // url
    // method
    // headers
    // body
    // params
    // query
    const response = http.getResponse<Response>();

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        statusCode: response.statusCode,
        message: 'عملیات با موفقیت انجام شد',
        data,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}

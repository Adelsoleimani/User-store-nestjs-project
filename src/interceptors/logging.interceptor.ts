import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // befor
    const now = Date.now();

    // after
    return next.handle().pipe(
      tap(() => {
        console.log(`time total : ${Date.now() - now}`);
      }),
    );
  }
}

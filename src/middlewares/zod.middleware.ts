import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, HttpException } from '@nestjs/common';
import { Observable, throwError, catchError } from 'rxjs';
import { z } from 'zod';

@Injectable()
export class ZodErrorsInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof z.ZodError) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              // message: err.flatten(), //! returns zod's error messages
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        return throwError(() => err);
      }),
    );
  }
}

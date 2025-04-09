// src/shared/logger/logger.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { RequestContextService } from '../services/request-context.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService,
    private readonly requestContext: RequestContextService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    interface EnhancedRequest<
      Q = Record<string, any>,
      P = Record<string, any>,
      B = unknown,
    > {
      query?: Q;
      params?: P;
      body?: B;
      [key: string]: any;
    }

    const http = context.switchToHttp();
    const request = http.getRequest<EnhancedRequest>();
    const handler = `${context.getClass().name}.${context.getHandler().name}`;
    const requestId = randomUUID();

    this.requestContext.setRequestId(requestId);
    const start = Date.now();

    this.logger.log('Request received', handler, {
      body: request.body,
      query: request.query ?? {},
      params: request.params,
    });

    return next.handle().pipe(
      tap((data) => {
        const elapsedMs = Date.now() - start;
        this.logger.log('Request handled', handler, data, { elapsedMs });
      }),
    );
  }
}

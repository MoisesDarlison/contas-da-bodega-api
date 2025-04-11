import { Injectable } from '@nestjs/common';
import { ILogger } from '../contracts/logger.interface';
import { RequestContextService } from './request-context.service';

@Injectable()
export class LoggerService {
  constructor(
    private readonly adapter: ILogger,
    private readonly requestContext: RequestContextService,
  ) {}

  private getRequestId() {
    return this.requestContext.getRequestId() || '';
  }

  log(
    message: string,
    context?: string,
    payload?: unknown,
    meta?: Record<string, any>,
  ) {
    this.adapter.log(message, this.getRequestId(), context, payload, meta);
  }

  msg(
    message: string,
    context?: string,
    payload?: unknown,
    meta?: Record<string, any>,
  ) {
    this.adapter.log(message, this.getRequestId(), context, payload, meta);
  }

  error(message: string, trace?: string, context?: string) {
    this.adapter.error(message, this.getRequestId(), trace, context);
  }

  warn(message: string, context?: string) {
    this.adapter.warn(message, this.getRequestId(), context);
  }
}

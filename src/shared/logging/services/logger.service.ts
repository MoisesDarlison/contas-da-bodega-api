import { Injectable } from '@nestjs/common';
import { ILogger } from '../contracts/logger.interface';
import { RequestContextService } from './request-context.service';

@Injectable()
export class LoggerService {
  constructor(
    private readonly adapter: ILogger,
    private readonly requestContext: RequestContextService,
  ) {}

  private formatPrefix(handler?: string) {
    const requestId = this.requestContext.getRequestId();
    return `[${requestId}]${handler ? ` ${handler}` : ''}`;
  }

  log(
    message: string,
    context?: string,
    payload?: unknown,
    meta?: Record<string, any>,
  ) {
    this.adapter.log(
      `${this.formatPrefix(context)} -> ${message}`,
      context,
      payload,
      meta,
    );
  }

  msg(
    message: string,
    context?: string,
    payload?: unknown,
    meta?: Record<string, any>,
  ) {
    this.adapter.log(
      `${this.formatPrefix(context)} ->> ${message}`,
      context,
      payload,
      meta,
    );
  }

  error(message: string, trace?: string, context?: string) {
    const prefix = this.formatPrefix(context);
    this.adapter.error(`${prefix} | ${message}`, trace, context);
  }

  warn(message: string, context?: string) {
    const prefix = this.formatPrefix(context);
    this.adapter.warn(`${prefix} | ${message}`, context);
  }
}

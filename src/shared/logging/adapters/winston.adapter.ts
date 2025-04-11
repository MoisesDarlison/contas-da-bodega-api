import { createLogger } from 'winston';
import { ILogger } from '../contracts/logger.interface';
import { winstonLogger } from './winston.config';

export class WinstonLoggerAdapterImpl implements ILogger {
  private readonly logger = createLogger(winstonLogger);

  log(
    message: string,
    requestId: string,
    context?: string,
    payload?: unknown,
    meta?: Record<string, any>,
  ) {
    this.logger.info(message, { requestId, context, payload, meta });
  }

  error(message: string, requestId: string, trace?: string, context?: string) {
    this.logger.error(message, { requestId, trace, context });
  }

  warn(message: string, requestId: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, requestId: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, requestId: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}

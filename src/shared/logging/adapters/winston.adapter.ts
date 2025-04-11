import { createLogger } from 'winston';
import { ILogger } from '../contracts/logger.interface';
import { winstonLogger } from './winston.config';

export class WinstonLoggerAdapterImpl implements ILogger {
  private readonly logger = createLogger(winstonLogger);

  log(
    message: string,
    context?: string,
    payload?: unknown,
    meta?: Record<string, any>,
  ) {
    this.logger.info(message, { context, payload, meta });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}

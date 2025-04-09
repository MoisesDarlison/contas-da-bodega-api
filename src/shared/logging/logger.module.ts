import { Global, Module } from '@nestjs/common';
import { WinstonLoggerAdapter } from './adapters/winston.adapter';
import { ILogger } from './contracts/logger.interface';
import { LoggerService } from './services/logger.service';
import { RequestContextService } from './services/request-context.service';

@Global()
@Module({
  providers: [
    RequestContextService,
    {
      provide: ILogger,
      useClass: WinstonLoggerAdapter,
    },
    LoggerService,
  ],
  exports: [LoggerService, ILogger, RequestContextService],
})
export class LoggerModule {}

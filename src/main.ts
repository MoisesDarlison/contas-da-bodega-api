import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/application/filters/http-exception.filter';
import { LoggerInterceptor } from './shared/infrastructure/logging/interceptors/logger.interceptor';
import { TraceRequestIdMiddleware } from './shared/infrastructure/logging/middlewares/logger.middleware';
import { LoggerService } from './shared/infrastructure/logging/services/logger.service';
import { RequestContextService } from './shared/infrastructure/logging/services/request-context.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const requestContext = app.get(RequestContextService);
  app.use(
    new TraceRequestIdMiddleware(requestContext).use.bind(
      new TraceRequestIdMiddleware(requestContext),
    ),
  );
  const loggerService = app.get(LoggerService);

  app.useGlobalInterceptors(
    new LoggerInterceptor(loggerService, requestContext),
  );
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
// Inserir conceito de object value

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ConflictError,
  EntityError,
  NotFoundError,
} from '../errors/exceptions';
import { LoggerService } from '../logging/services/logger.service';
import { extractValidationMessage } from '../utils/http/validation-error-message.util';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof NotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof ConflictError) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    } else if (exception instanceof EntityError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = exception.message;
    } else if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      const responseMessage = exception.getResponse();
      message = extractValidationMessage(responseMessage);
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(
      `Status: ${status} | Message: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
      'AllExceptionsFilter',
    );

    response.status(status).json({ statusCode: status, message });
  }
}

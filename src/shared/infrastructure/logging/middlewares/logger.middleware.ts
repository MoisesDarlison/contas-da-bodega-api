import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { RequestContextService } from '../services/request-context.service';

@Injectable()
export class TraceRequestIdMiddleware implements NestMiddleware {
  constructor(private readonly contextService: RequestContextService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = Array.isArray(req.headers['x-request-id'])
      ? req.headers['x-request-id'][0]
      : req.headers['x-request-id'] || randomUUID();
    res.setHeader('x-request-id', requestId);
    this.contextService.run(requestId, () => next());
  }
}

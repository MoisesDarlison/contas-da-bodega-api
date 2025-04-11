export abstract class ILogger {
  abstract log(
    message: string,
    requestId: string,
    context?: string,
    payload?: unknown,
    meta?: Record<string, any>,
  ): void;

  abstract error(
    message: string,
    requestId: string,
    trace?: string,
    context?: string,
  ): void;

  abstract warn(message: string, requestId: string, context?: string): void;

  abstract debug(message: string, requestId: string, context?: string): void;

  abstract verbose(message: string, requestId: string, context?: string): void;
}

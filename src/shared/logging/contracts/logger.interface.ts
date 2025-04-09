export abstract class ILogger {
  abstract log(
    message: string,
    context?: string,
    payload?: unknown,
    meta?: Record<string, any>,
  ): void;

  abstract error(message: string, trace?: string, context?: string): void;

  abstract warn(message: string, context?: string): void;

  abstract debug(message: string, context?: string): void;

  abstract verbose(message: string, context?: string): void;
}

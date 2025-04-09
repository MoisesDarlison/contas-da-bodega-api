import { createLogger, format, transports } from 'winston';

export const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({
        timestamp,
        level,
        message,
      }: {
        timestamp: string;
        level: string;
        message: string;
      }) => {
        return `[${timestamp}] ${level.toUpperCase()} | ${message}`;
      },
    ),
  ),
  transports: [new transports.Console()],
});

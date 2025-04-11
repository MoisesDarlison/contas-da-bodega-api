/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createLogger, format, transports } from 'winston';

export const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf((info) => {
      const { timestamp, requestId, context, message, payload, meta } = info;
      let log = `[${timestamp}][${requestId}][${context}] ${message} | `;
      if (payload) log += JSON.stringify({ payload });
      if (meta) log += JSON.stringify({ meta });
      return log;
    }),
  ),
  transports: [new transports.Console()],
});

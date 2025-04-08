export function extractValidationMessage(error: unknown): string {
  if (isObjectWithMessage(error)) {
    const messageField = getMessageField(error.message);
    if (Array.isArray(messageField)) return messageField.join(' | ');
    if (typeof messageField === 'string') return messageField;
  }
  return 'Bad request';
}

function isObjectWithMessage(error: unknown): error is { message?: unknown } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

function getMessageField(message: unknown): string | string[] | undefined {
  return typeof message === 'string' || Array.isArray(message)
    ? message
    : undefined;
}

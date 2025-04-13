export class NotFoundError extends Error {
  constructor(message: string, id?: string) {
    if (id) {
      message += `: ${id}`;
    }
    super(message);
    this.name = 'NotFoundError';
  }
}

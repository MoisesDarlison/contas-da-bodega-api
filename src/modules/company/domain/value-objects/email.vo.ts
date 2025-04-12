import { EmailBase } from 'src/shared/value-objects/email.vo';

export class Email extends EmailBase {
  constructor(email: string) {
    super(email);
  }

  getDomain(): string {
    const domain = super.getEmail().split('@')[1];
    return domain;
  }
}

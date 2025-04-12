import { EntityError } from '../errors/exceptions';

export class EmailBase {
  private readonly value: string;

  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new EntityError('Invalid email format');
    }
    this.value = email.toLowerCase();
  }

  private isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  getEmail(): string {
    return this.value;
  }

  isEqualTo(other: EmailBase): boolean {
    return this.value === other.getEmail();
  }
}

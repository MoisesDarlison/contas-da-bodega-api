import { randomUUID } from 'node:crypto';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { EntityError } from 'src/shared/errors/exceptions';

export class Company {
  private constructor(
    private readonly id: string,
    private name: string,
    private email: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private phone?: string,
    private deletedAt?: Date | null,
  ) {}

  static create(input: {
    name: string;
    email: string;
    phone?: string;
  }): Company {
    if (!input.name || !input.email) {
      throw new EntityError(ERROR_MESSAGES.NAME_EMAIL_ARE_REQUIRED);
    }

    const now = new Date();
    const id = randomUUID();
    return new Company(id, input.name, input.email, now, now, input.phone);
  }

  static clone(
    id: string,
    props: {
      name: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      phone?: string;
      deletedAt?: Date | null;
    },
  ): Company {
    return new Company(
      id,
      props.name,
      props.email,
      props.createdAt,
      props.updatedAt,
      props.phone,
      props.deletedAt,
    );
  }

  getId(): string {
    return this.id;
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}

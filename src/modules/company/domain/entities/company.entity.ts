import { randomUUID } from 'node:crypto';
import { EntityError } from 'src/shared/domain/errors';
import { ERROR_MESSAGES } from 'src/shared/domain/errors/error-messages';
import { Email } from '../value-objects/email.vo';

export class Company {
  private constructor(
    private readonly id: string,
    private name: string,
    private email: Email,
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
    if (!input.name) throw new EntityError(ERROR_MESSAGES.NAME_ARE_REQUIRED);

    const now = new Date();
    const id = randomUUID();
    const email = new Email(input.email);
    return new Company(id, input.name, email, now, now, input.phone);
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
      new Email(props.email),
      props.createdAt,
      props.updatedAt,
      props.phone,
      props.deletedAt,
    );
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email.getEmail();
  }

  updateEmail(newEmail: string) {
    this.email = new Email(newEmail);
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}

import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { EntityError } from 'src/shared/domain/errors';
import { ERROR_MESSAGES } from 'src/shared/domain/errors/error-messages';
import { Email } from '../value-objects/email.vo';

export class User {
  private constructor(
    private id: string,
    private name: string,
    private email: Email,
    private password: string,
    private createdAt: Date,
    private updatedAt: Date,
    private phone?: string,
    private deletedAt?: Date | null,
  ) {}

  static create(input: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): User {
    const now = new Date();
    const id = randomUUID();
    const SALT = Number(process.env.SALT_PWD) || 6;

    if (!input.name) {
      throw new EntityError(ERROR_MESSAGES.NAME_ARE_REQUIRED);
    }

    return new User(
      id,
      input.name,
      new Email(input.email),
      bcrypt.hashSync(input.password, SALT),
      now,
      now,
      input.phone,
      null,
    );
  }

  static clone(
    id: string,
    props: {
      name: string;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
      phone?: string;
      deletedAt?: Date | null;
    },
  ): User {
    return new User(
      id,
      props.name,
      new Email(props.email),
      props.password,
      props.createdAt,
      props.updatedAt,
      props.phone,
      props.deletedAt ?? null,
    );
  }

  getId(): string {
    return this.id;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email.getEmail(),
      password: this.password,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      phone: this.phone || null,
    };
  }

  private touch() {
    this.updatedAt = new Date();
  }
}

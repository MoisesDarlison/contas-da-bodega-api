import { randomUUID } from 'node:crypto';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { EntityError } from 'src/shared/errors/exceptions';

export class User {
  private constructor(
    private id: string,
    private name: string,
    private email: string,
    private isActive: boolean,
    private createdAt: Date,
    private updatedAt: Date,
    private phone?: string,
    private deletedAt?: Date | null,
  ) {}

  static create(input: {
    name: string;
    email: string;
    company: string;
    phone?: string;
  }): User {
    const now = new Date();
    const id = randomUUID();

    if (!input.name || !input.email) {
      throw new EntityError(ERROR_MESSAGES.NAME_EMAIL_ARE_REQUIRED);
    }

    return new User(
      id,
      input.name,
      input.email,
      true,
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
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
      phone?: string;
      deletedAt?: Date | null;
    },
  ): User {
    return new User(
      id,
      props.name,
      props.email,
      props.isActive,
      props.createdAt,
      props.updatedAt,
      props.phone,
      props.deletedAt ?? null,
    );
  }

  getId(): string {
    return this.id;
  }

  deactivate() {
    this.isActive = false;
    this.touch();
  }

  activate() {
    this.isActive = true;
    this.touch();
  }

  updatePhone(newPhone: string) {
    this.phone = newPhone;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}

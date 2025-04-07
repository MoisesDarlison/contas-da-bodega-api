import { randomUUID } from 'node:crypto';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { EntityError } from 'src/shared/errors/exceptions';

export class Person {
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
  }): Person {
    const now = new Date();
    const id = randomUUID();

    if (!input.name || !input.email) {
      throw new EntityError(ERROR_MESSAGES.NAME_EMAIL_ARE_REQUIRED);
    }

    return new Person(
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

  static clone(props: {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    phone?: string;
    deletedAt?: Date | null;
  }): Person {
    return new Person(
      props.id,
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

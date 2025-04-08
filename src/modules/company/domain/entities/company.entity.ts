import { randomBytes, randomUUID } from 'node:crypto';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { EntityError } from 'src/shared/errors/exceptions';

export class Company {
  private constructor(
    private readonly id: string,
    private sharingIdentifier: string,
    private name: string,
    private email: string,
    private isActive: boolean,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private deletedAt?: Date | null,
    private phone?: string,
  ) {}

  static create(input: {
    name: string;
    email: string;
    phone?: string;
    sharingIdentifier?: string;
  }): Company {
    if (!input.name || !input.email) {
      throw new EntityError(ERROR_MESSAGES.NAME_EMAIL_ARE_REQUIRED);
    }

    const now = new Date();
    const id = randomUUID();
    const sharingIdentifier = randomBytes(8).toString('base64url');

    return new Company(
      id,
      sharingIdentifier,
      input.name,
      input.email,
      true,
      now,
      now,
      null,
      input.phone,
    );
  }

  static clone(
    id: string,
    props: {
      sharingIdentifier: string;
      name: string;
      email: string;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
      phone?: string;
      deletedAt?: Date | null;
    },
  ): Company {
    return new Company(
      id,
      props.sharingIdentifier,
      props.name,
      props.email,
      props.isActive,
      props.createdAt,
      props.updatedAt,
      props.deletedAt ?? null,
      props.phone,
    );
  }

  getId(): string {
    return this.id;
  }

  getSharingIdentifier(): string {
    return this.sharingIdentifier;
  }

  isCompanyActive(): boolean {
    return this.isActive;
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

  updateName(newName: string) {
    this.name = newName;
    this.touch();
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}

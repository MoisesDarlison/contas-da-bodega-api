import { randomUUID } from 'node:crypto';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export class Person {
  private constructor(
    private id: string,
    private name: string,
    private email: string,
    private type: PermissionTypesEnum,
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
      throw new Error('Name and Email are required');
    }

    return new Person(
      id,
      input.name,
      input.email,
      PermissionTypesEnum.EMPLOYEE,
      true,
      now,
      now,
      input.phone,
      null,
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

  updateType(newType: PermissionTypesEnum) {
    this.type = newType;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}

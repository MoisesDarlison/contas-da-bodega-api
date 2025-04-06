import { randomUUID } from 'node:crypto';
import { PersonType } from 'src/shared/enums/person-type.enum';

export class Person {
  private constructor(
    private id: string,
    private name: string,
    private email: string,
    private companyIds: string[],
    private type: PersonType,
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
      [input.company],
      PersonType.EMPLOYEE,
      true,
      now,
      now,
      input.phone,
      null,
    );
  }

  getId() {
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

  updateType(newType: PersonType) {
    this.type = newType;
    this.touch();
  }

  addCompany(companyId: string) {
    if (!this.companyIds.includes(companyId)) {
      this.companyIds.push(companyId);
      this.touch();
    }
  }

  removeCompany(companyId: string) {
    this.companyIds = this.companyIds.filter((id) => id !== companyId);
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}

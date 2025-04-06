import { randomUUID } from 'node:crypto';

export class Company {
  private constructor(
    private readonly id: string,
    private name: string,
    private emailManager: string,
    private personIds: string[],
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
  }): Company {
    const now = new Date();
    const id = randomUUID();

    if (!input.name || !input.email) {
      throw new Error('Name and Email Manager are required');
    }

    return new Company(
      id,
      input.name,
      input.email,
      [],
      true,
      now,
      now,
      null,
      input.phone,
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
  addPerson(personId: string) {
    if (!this.personIds.includes(personId)) {
      this.personIds.push(personId);
      this.touch();
    }
  }

  removePerson(personId: string) {
    this.personIds = this.personIds.filter((id) => id !== personId);
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}

import { randomUUID } from 'node:crypto';

export class Company {
  private constructor(
    private readonly id: string,
    private name: string,
    private emailManager: string,
    private filialId: string,
    private isActive: boolean,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private deletedAt?: Date | null,
    private phone?: string,
  ) {}

  static create(input: {
    name: string;
    email: string;
    filialId: string;
    phone?: string;
  }): Company {
    const now = new Date();
    const id = randomUUID();

    if (!input.name || !input.email || !input.filialId) {
      throw new Error('Name, Email Manager and Filial ID are required');
    }

    return new Company(
      id,
      input.name,
      input.email,
      input.filialId,
      true,
      now,
      now,
      null,
      input.phone,
    );
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

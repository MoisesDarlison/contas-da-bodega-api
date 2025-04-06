export class Company {
  constructor(
    public readonly id: string,
    public name: string,
    public emailManager: string,
    public filialId: string,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt?: Date | null,
    public phone?: string,
  ) {}
}

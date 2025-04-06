export class PersonCompany {
  constructor(
    public readonly personId: string,
    public readonly companyId: string,
    public readonly assignedAt: Date = new Date(),
    public readonly roleInCompany?: string,
  ) {}
}

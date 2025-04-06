export class Person {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public company: string,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public phone?: string,
  ) {}
}

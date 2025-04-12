import { Company } from '../entities/company.entity';

export abstract class ACompanyRepository {
  abstract create(company: Company): Promise<Company>;
  abstract findById(id: string): Promise<Company | null>;
  abstract findAll(page: number, limit: number): Promise<Company[]>;
  abstract countDocuments(): Promise<number>;
}

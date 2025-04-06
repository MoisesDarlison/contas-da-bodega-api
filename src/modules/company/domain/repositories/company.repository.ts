import { Company } from '../entities/company.entity';

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<Company>;
  abstract findById(id: string): Promise<Company | null>;
  abstract update(company: Company): Promise<void>;
  abstract findAll(): Promise<Company[]>;
}

import { Company } from '../entities/company.entity';

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<Company>;
  abstract findAll(): Promise<Company[]>;
}

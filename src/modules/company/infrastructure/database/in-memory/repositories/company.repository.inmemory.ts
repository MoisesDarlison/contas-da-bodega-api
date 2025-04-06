/* eslint-disable @typescript-eslint/require-await */

import { Company } from '../../../../domain/entities/company.entity';
import { CompanyRepository } from '../../../../domain/repositories/company.repository';

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = [];

  async create(company: Company): Promise<Company> {
    this.companies.push(company);
    return company;
  }

  async findById(id: string): Promise<Company | null> {
    return this.companies.find((c) => c.getId() === id) ?? null;
  }

  async update(company: Company): Promise<void> {
    const index = this.companies.findIndex(
      (c) => c.getId() === company.getId(),
    );
    if (index >= 0) {
      this.companies[index] = company;
    }
  }

  async findAll(): Promise<Company[]> {
    return this.companies;
  }
}

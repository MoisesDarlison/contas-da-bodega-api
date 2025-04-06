import { Injectable } from '@nestjs/common';

import { Company } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../domain/repositories/company.repository';

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(input: {
    name: string;
    email: string;
    phone?: string;
  }): Promise<Company> {
    const company = Company.create(input);
    return this.repo.create(company);
  }
}

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CompanyRepository } from '../domain/repositories/company.repository';
import { Company } from '../domain/entities/company.entity';

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(input: {
    name: string;
    email: string;
    filialId: string;
    phone?: string;
  }): Promise<Company> {
    const now = new Date();
    const company = new Company(
      randomUUID(),
      input.name,
      input.email,
      input.filialId,
      true,
      now,
      now,
      null,
      input.phone,
    );

    return this.repo.create(company);
  }
}

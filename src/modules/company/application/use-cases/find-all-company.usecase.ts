import { Injectable } from '@nestjs/common';

import { Company } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../domain/repositories/company.repository';

@Injectable()
export class FindAllCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(): Promise<Company[]> {
    return this.repo.findAll();
  }
}

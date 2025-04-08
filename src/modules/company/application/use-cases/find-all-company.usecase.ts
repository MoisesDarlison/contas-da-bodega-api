import { Injectable } from '@nestjs/common';

import { paginate } from 'src/shared/utils/pagination.util';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import {
  IFindAllCompanyOutput,
  IFindAllCompanyUseCaseInput,
} from '../contracts/find-all-company.contract';
import { companyDomainToApplication } from '../mappers/company.mapper';

@Injectable()
export class FindAllCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(
    input: IFindAllCompanyUseCaseInput,
  ): Promise<IFindAllCompanyOutput> {
    const { page, limit } = input;
    const { docs, total } = await this.repo.findAll(page, limit);
    const output = docs.map(companyDomainToApplication);

    return paginate(output, total, page, limit);
  }
}

import { Injectable } from '@nestjs/common';

import { LoggerService } from 'src/shared/logging/services/logger.service';
import { paginate } from 'src/shared/utils/pagination.util';
import { ICompanyRepository } from '../../domain/repositories/company.repository';
import {
  IFindAllCompanyOutput,
  IFindAllCompanyUseCaseInput,
} from '../contracts/find-all-company.contract';
import { companyDomainToApplication } from '../mappers/company.mapper';

@Injectable()
export class FindAllCompanyUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly repo: ICompanyRepository,
  ) {}

  async execute(
    query: IFindAllCompanyUseCaseInput,
  ): Promise<IFindAllCompanyOutput> {
    const prefix = `${FindAllCompanyUseCase.name}.${this.execute.name}`;
    this.logger.log('Consult List Companies', prefix, { query });

    const { page, limit } = query;
    const { docs, total } = await this.repo.findAll(page, limit);
    const output = docs.map(companyDomainToApplication);

    return paginate(output, total, page, limit);
  }
}

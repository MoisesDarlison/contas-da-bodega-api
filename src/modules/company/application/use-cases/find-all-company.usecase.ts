import { Injectable } from '@nestjs/common';

import { paginate } from 'src/shared/application/utils/pagination.util';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { ACompanyRepository } from '../../domain/contracts/company-repository.abstract';
import {
  IFindAllCompanyOutput,
  IFindAllCompanyUseCaseInput,
} from '../contracts/find-all-company.contract';
import { companyDomainToApplication } from '../mappers/company.mapper';

@Injectable()
export class FindAllCompanyUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly repo: ACompanyRepository,
  ) {}

  async execute(
    query: IFindAllCompanyUseCaseInput,
  ): Promise<IFindAllCompanyOutput> {
    const prefix = `${FindAllCompanyUseCase.name}.${this.execute.name}`;
    this.logger.log('Consult List Companies', prefix, { query });

    const { page, limit } = query;
    const docs = await this.repo.findAll(page, limit);
    const total = await this.repo.countDocuments();
    const output = docs.map(companyDomainToApplication);

    return paginate(output, total, page, limit);
  }
}

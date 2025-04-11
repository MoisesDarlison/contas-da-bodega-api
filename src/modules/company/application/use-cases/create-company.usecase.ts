import { Injectable } from '@nestjs/common';

import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { ConflictError } from 'src/shared/errors/exceptions';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { isMongoError } from 'src/shared/utils/mongo/is-mongo-error.util';
import { Company } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import {
  ICreateCompanyUseCaseInput,
  ICreateCompanyUseCaseOutput,
} from '../contracts/create-company.contract';
import { companyDomainToApplication } from '../mappers/company.mapper';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly repo: CompanyRepository,
  ) {}

  async execute(
    input: ICreateCompanyUseCaseInput,
  ): Promise<ICreateCompanyUseCaseOutput> {
    const prefix = `${CreateCompanyUseCase.name}-${this.execute.name}`;
    try {
      this.logger.msg('teste 123 ', prefix);
      const company = Company.create(input);
      const output = await this.repo.create(company);
      return companyDomainToApplication(output);
    } catch (error: unknown) {
      if (
        isMongoError(error) &&
        error.code === 11000 &&
        error.message.includes('email')
      ) {
        throw new ConflictError(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
      }
      throw error;
    }
  }
}

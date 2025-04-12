import { Injectable } from '@nestjs/common';

import { isMongoError } from 'src/shared/application/utils/mongo/is-mongo-error.util';
import { ConflictError } from 'src/shared/domain/errors';
import { ERROR_MESSAGES } from 'src/shared/domain/errors/error-messages';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { ACompanyRepository } from '../../domain/contracts/company-repository.abstract';
import { Company } from '../../domain/entities/company.entity';
import {
  ICreateCompanyUseCaseInput,
  ICreateCompanyUseCaseOutput,
} from '../contracts/create-company.contract';
import { companyDomainToApplication } from '../mappers/company.mapper';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly repo: ACompanyRepository,
  ) {}

  async execute(
    input: ICreateCompanyUseCaseInput,
  ): Promise<ICreateCompanyUseCaseOutput> {
    try {
      const prefix = `${CreateCompanyUseCase.name}.${this.execute.name}`;
      this.logger.log('Create Company UseCase', prefix, { input });

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

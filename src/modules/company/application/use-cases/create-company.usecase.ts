import { Injectable } from '@nestjs/common';

import { Company } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import { ConflictError } from 'src/shared/errors/exceptions';
import { isMongoError } from 'src/shared/utils/mongo/is-mongo-error.util';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(input: {
    name: string;
    email: string;
    phone?: string;
  }): Promise<Company> {
    try {
      const company = Company.create(input);
      return await this.repo.create(company);
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

import { Injectable } from '@nestjs/common';

import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { ConflictError } from 'src/shared/errors/exceptions';
import { isMongoError } from 'src/shared/utils/mongo/is-mongo-error.util';
import { Person } from '../../domain/entities/person.entity';
import { PersonRepository } from '../../domain/repositories/person.repository';
import {
  ICreatePersonUseCaseInput,
  ICreatePersonUseCaseOutput,
} from '../contracts/create-company.contract';
import { personDomainToApplication } from '../mappers/person.mapper';

@Injectable()
export class CreatePersonUseCase {
  constructor(private readonly repo: PersonRepository) {}

  async execute(
    input: ICreatePersonUseCaseInput,
  ): Promise<ICreatePersonUseCaseOutput> {
    try {
      const person = Person.create(input);
      const output = await this.repo.create(person);
      return personDomainToApplication(output);
    } catch (error) {
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

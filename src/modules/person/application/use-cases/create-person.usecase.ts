import { Injectable } from '@nestjs/common';

import { Person } from '../../domain/entities/person.entity';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { isMongoError } from 'src/shared/utils/mongo/is-mongo-error.util';
import { ConflictError } from 'src/shared/errors/exceptions';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';

@Injectable()
export class CreatePersonUseCase {
  constructor(private readonly repo: PersonRepository) {}

  async execute(input: {
    name: string;
    email: string;
    phone?: string;
    company: string;
  }): Promise<Person> {
    try {
      const person = Person.create(input);

      return await this.repo.create(person);
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

import { Injectable } from '@nestjs/common';

import { Person } from '../../domain/entities/person.entity';
import { PersonRepository } from '../../domain/repositories/person.repository';

@Injectable()
export class CreatePersonUseCase {
  constructor(private readonly repo: PersonRepository) {}

  async execute(input: {
    name: string;
    email: string;
    phone?: string;
    company: string;
  }): Promise<Person> {
    const person = Person.create(input);

    return this.repo.create(person);
  }
}

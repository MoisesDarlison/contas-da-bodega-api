import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { Person } from '../../domain/entities/person.entity';
import { PersonRepository } from '../../domain/repositories/person.repository';

@Injectable()
export class CreatePersonUseCase {
  constructor(private readonly personRepo: PersonRepository) {}

  async execute(input: {
    name: string;
    email: string;
    phone?: string;
    company: string;
  }): Promise<Person> {
    const now = new Date();
    const person = new Person(
      randomUUID(),
      input.name,
      input.email,
      input.company,
      true,
      now,
      now,
      input.phone,
    );

    return this.personRepo.create(person);
  }
}

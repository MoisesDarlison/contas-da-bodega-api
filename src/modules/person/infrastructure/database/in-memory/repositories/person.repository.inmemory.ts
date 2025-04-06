/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Person } from '../../../../domain/entities/person.entity';
import { PersonRepository } from '../../../../domain/repositories/person.repository';

@Injectable()
export class InMemoryPersonRepository implements PersonRepository {
  private persons: Person[] = [];

  async create(person: Person): Promise<Person> {
    this.persons.push(person);
    return person;
  }
}

/* eslint-disable @typescript-eslint/require-await */
import { Person } from '../../../../domain/entities/person.entity';
import { PersonRepository } from '../../../../domain/repositories/person.repository';

export class InMemoryPersonRepository implements PersonRepository {
  findAll(page: number, limit: number): Promise<{ docs: Person[]; total: number; }> {
    throw new Error('Method not implemented.');
  }
  private persons: Person[] = [];

  async create(person: Person): Promise<Person> {
    this.persons.push(person);
    return person;
  }

  async findById(id: string): Promise<Person | null> {
    return this.persons.find((p) => p.getId() === id) ?? null;
  }

  async update(person: Person): Promise<void> {
    const index = this.persons.findIndex((p) => p.getId() === person.getId());
    if (index >= 0) {
      this.persons[index] = person;
    }
  }

  async findAll2(): Promise<Person[]> {
    return this.persons;
  }
}

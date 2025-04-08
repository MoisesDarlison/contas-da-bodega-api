import { Person } from '../entities/person.entity';

export abstract class PersonRepository {
  abstract create(person: Person): Promise<Person>;
  abstract findById(id: string): Promise<Person | null>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<{ docs: Person[]; total: number }>;
}

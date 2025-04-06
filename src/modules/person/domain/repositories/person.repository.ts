import { Person } from '../entities/person.entity';

export abstract class PersonRepository {
  abstract create(person: Person): Promise<Person>;
  abstract findAll(): Promise<Person[]>;
}

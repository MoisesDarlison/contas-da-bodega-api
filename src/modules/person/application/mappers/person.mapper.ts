import { Person } from '../../domain/entities/person.entity';

export function personDomainToApplication(person: Person) {
  return {
    id: person.getId(),
    name: person['name'],
    email: person['email'],
  };
}

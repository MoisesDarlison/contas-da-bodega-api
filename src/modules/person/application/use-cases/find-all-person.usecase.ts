import { Injectable } from '@nestjs/common';

import { Person } from '../../domain/entities/person.entity';
import { PersonRepository } from '../../domain/repositories/person.repository';

@Injectable()
export class FindAllPersonUseCase {
  constructor(private readonly repo: PersonRepository) {}

  async execute(): Promise<Person[]> {
    return this.repo.findAll();
  }
}

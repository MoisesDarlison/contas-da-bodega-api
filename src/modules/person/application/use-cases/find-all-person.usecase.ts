import { Injectable } from '@nestjs/common';
import { paginate } from 'src/shared/utils/pagination.util';
import { PersonRepository } from '../../domain/repositories/person.repository';
import {
  IFindAllPersonOutput,
  IFindAllPersonUseCaseInput,
} from '../contracts/find-all-person.contract';
import { personDomainToApplication } from '../mappers/person.mapper';

@Injectable()
export class FindAllPersonUseCase {
  constructor(private readonly repo: PersonRepository) {}

  async execute(
    input: IFindAllPersonUseCaseInput,
  ): Promise<IFindAllPersonOutput> {
    const { page, limit } = input;
    const { docs, total } = await this.repo.findAll(page, limit);
    const output = docs.map(personDomainToApplication);
    return paginate(output, total, page, limit);
  }
}

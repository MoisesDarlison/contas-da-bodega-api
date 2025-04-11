import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { paginate } from 'src/shared/utils/pagination.util';
import { PersonRepository } from '../../domain/repositories/person.repository';
import {
  IFindAllPersonOutput,
  IFindAllPersonUseCaseInput,
} from '../contracts/find-all-person.contract';
import { personDomainToApplication } from '../mappers/person.mapper';

@Injectable()
export class FindAllPersonUseCase {
  constructor(
    private readonly repo: PersonRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute(
    input: IFindAllPersonUseCaseInput,
  ): Promise<IFindAllPersonOutput> {
    const prefix = `${FindAllPersonUseCase.name}.${this.execute.name}`;
    this.logger.log('FindAll Person UseCase', prefix, input);

    const { page, limit } = input;
    const { docs, total } = await this.repo.findAll(page, limit);
    const output = docs.map(personDomainToApplication);
    return paginate(output, total, page, limit);
  }
}

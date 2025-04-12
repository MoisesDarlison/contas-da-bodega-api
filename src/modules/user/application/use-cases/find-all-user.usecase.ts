import { Injectable } from '@nestjs/common';
import { paginate } from 'src/shared/application/utils/pagination.util';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { AUserRepository } from '../../domain/contracts/user-repository.abstract';
import {
    IFindAllUserOutput,
    IFindAllUserUseCaseInput,
} from '../contracts/find-all-user.contract';
import { userDomainToApplication } from '../mappers/user.mapper';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    private readonly repo: AUserRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute(input: IFindAllUserUseCaseInput): Promise<IFindAllUserOutput> {
    const prefix = `${FindAllUsersUseCase.name}.${this.execute.name}`;
    this.logger.log('FindAll User UseCase', prefix, input);

    const { page, limit } = input;
    const { docs, total } = await this.repo.findAll(page, limit);
    const output = docs.map(userDomainToApplication);
    return paginate(output, total, page, limit);
  }
}

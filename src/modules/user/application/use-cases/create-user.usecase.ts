import { Injectable } from '@nestjs/common';

import { isMongoError } from 'src/shared/application/utils/mongo/is-mongo-error.util';
import { ConflictError } from 'src/shared/domain/errors';
import { ERROR_MESSAGES } from 'src/shared/domain/errors/error-messages';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { AUserRepository } from '../../domain/contracts/user-repository.abstract';
import { User } from '../../domain/entities/user.entity';
import {
  ICreateUserUseCaseInput,
  ICreateUserUseCaseOutput,
} from '../contracts/create-user.contract';
import { userDomainToApplication } from '../mappers/user.mapper';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly repo: AUserRepository,
  ) {}

  async execute(
    input: ICreateUserUseCaseInput,
  ): Promise<ICreateUserUseCaseOutput> {
    try {
      const prefix = `${CreateUserUseCase.name}.${this.execute.name}`;
      this.logger.log('Create User UseCase', prefix, input);

      const user = User.create(input);
      const output = await this.repo.create(user);
      return userDomainToApplication(output);
    } catch (error) {
      if (
        isMongoError(error) &&
        error.code === 11000 &&
        error.message.includes('email')
      ) {
        throw new ConflictError(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
      }
      throw error;
    }
  }
}

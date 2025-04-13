import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { AUserCompanyRepository } from '../../domain/contracts/user-company-repository.abstract';
import { IGetCompaniesByUserIdUseCaseOutput } from '../contracts/get-companies-by-user-id.contract';
import { userCompanyDomainToApplication } from '../mapper/get-companies-by-user-id.mapper';

@Injectable()
export class GetCompaniesByUserIdUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userCompanyRepo: AUserCompanyRepository,
  ) {}

  async execute(userId: string): Promise<IGetCompaniesByUserIdUseCaseOutput[]> {
    const prefix = `${GetCompaniesByUserIdUseCase.name}.${this.execute.name}`;
    this.logger.log('Get Companies By UserId UseCase', prefix, userId);
    const usersCompanies =
      await this.userCompanyRepo.findCompaniesByUserId(userId);
    return usersCompanies.map(userCompanyDomainToApplication);
  }
}

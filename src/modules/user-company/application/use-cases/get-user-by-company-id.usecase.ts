import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { AUserCompanyRepository } from '../../domain/contracts/user-company-repository.abstract';
import { IGetCompaniesByUserIdUseCaseOutput } from '../contracts/get-companies-by-user-id.contract';
import { userCompanyDomainToApplication } from '../mapper/get-companies-by-user-id.mapper';

@Injectable()
export class GetUserByCompanyIdUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userCompanyRepo: AUserCompanyRepository,
  ) {}

  async execute(
    companyId: string,
  ): Promise<IGetCompaniesByUserIdUseCaseOutput[]> {
    const prefix = `${GetUserByCompanyIdUseCase.name}.${this.execute.name}`;
    this.logger.log('Get Users By CompanyId UseCase', prefix, companyId);
    const usersCompanies =
      await this.userCompanyRepo.findUsersByCompanyId(companyId);
    return usersCompanies.map(userCompanyDomainToApplication);
  }
}

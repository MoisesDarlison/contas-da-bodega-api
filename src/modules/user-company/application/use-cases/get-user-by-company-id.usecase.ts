import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { AUserCompanyRepository } from '../../domain/contracts/user-company-repository.abstract';
import { UserCompany } from '../../domain/entities/user-company.entity';

@Injectable()
export class GetUserByCompanyIdUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userCompanyRepo: AUserCompanyRepository,
  ) {}

  async execute(companyId: string): Promise<UserCompany[]> {
    const prefix = `${GetUserByCompanyIdUseCase.name}.${this.execute.name}`;
    this.logger.log('Get Users By CompanyId UseCase', prefix, companyId);
    return this.userCompanyRepo.findUsersByCompanyId(companyId);
  }
}

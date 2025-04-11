import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { UserCompany } from '../../domain/entities/user-company.entity';
import { IUserCompanyRepository } from '../../domain/repositories/user-company.repository';

@Injectable()
export class GetUserByCompanyIdUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userCompanyRepo: IUserCompanyRepository,
  ) {}

  async execute(companyId: string): Promise<UserCompany[]> {
    const prefix = `${GetUserByCompanyIdUseCase.name}.${this.execute.name}`;
    this.logger.log('Get Users By CompanyId UseCase', prefix, companyId);
    return this.userCompanyRepo.findUsersByCompanyId(companyId);
  }
}

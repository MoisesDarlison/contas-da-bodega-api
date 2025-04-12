import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { AUserCompanyRepository } from '../../domain/contracts/user-company-repository.abstract';
import { UserCompany } from '../../domain/entities/user-company.entity';

@Injectable()
export class GetCompaniesByUserIdUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userCompanyRepo: AUserCompanyRepository,
  ) {}

  async execute(userId: string): Promise<UserCompany[]> {
    const prefix = `${GetCompaniesByUserIdUseCase.name}.${this.execute.name}`;
    this.logger.log('Get Companies By UserId UseCase', prefix, userId);
    return this.userCompanyRepo.findCompaniesByUserId(userId);
  }
}

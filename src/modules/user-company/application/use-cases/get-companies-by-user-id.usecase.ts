import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { UserCompany } from '../../domain/entities/user-company.entity';
import { IUserCompanyRepository } from '../../domain/repositories/user-company.repository';

@Injectable()
export class GetCompaniesByUserIdUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userCompanyRepo: IUserCompanyRepository,
  ) {}

  async execute(userId: string): Promise<UserCompany[]> {
    const prefix = `${GetCompaniesByUserIdUseCase.name}.${this.execute.name}`;
    this.logger.log('Get Companies By UserId UseCase', prefix, userId);
    return this.userCompanyRepo.findCompaniesByUserId(userId);
  }
}

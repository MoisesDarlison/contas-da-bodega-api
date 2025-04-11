import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { PersonCompany } from '../../domain/entities/person-company.entity';
import { PersonCompanyRepository } from '../../domain/repositories/person-company.repository';

@Injectable()
export class GetPersonsByCompanyIdUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly personCompanyRepo: PersonCompanyRepository,
  ) {}

  async execute(companyId: string): Promise<PersonCompany[]> {
    const prefix = `${GetPersonsByCompanyIdUseCase.name}.${this.execute.name}`;
    this.logger.log('Get Persons By CompanyId UseCase', prefix, companyId);
    return this.personCompanyRepo.findPersonsByCompanyId(companyId);
  }
}

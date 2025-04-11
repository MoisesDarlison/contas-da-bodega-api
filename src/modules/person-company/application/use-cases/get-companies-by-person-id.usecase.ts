import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { PersonCompany } from '../../domain/entities/person-company.entity';
import { PersonCompanyRepository } from '../../domain/repositories/person-company.repository';

@Injectable()
export class GetCompaniesByPersonIdUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly personCompanyRepo: PersonCompanyRepository,
  ) {}

  async execute(personId: string): Promise<PersonCompany[]> {
    const prefix = `${GetCompaniesByPersonIdUseCase.name}.${this.execute.name}`;
    this.logger.log('Get Companies By PersonId UseCase', prefix, personId);
    return this.personCompanyRepo.findCompaniesByPersonId(personId);
  }
}

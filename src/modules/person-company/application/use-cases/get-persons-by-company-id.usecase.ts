import { PersonCompanyRepository } from '../../domain/repositories/person-company.repository';
import { PersonCompany } from '../../domain/entities/person-company.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetPersonsByCompanyIdUseCase {
  constructor(private readonly personCompanyRepo: PersonCompanyRepository) {}

  async execute(companyId: string): Promise<PersonCompany[]> {
    return this.personCompanyRepo.findPersonsByCompanyId(companyId);
  }
}

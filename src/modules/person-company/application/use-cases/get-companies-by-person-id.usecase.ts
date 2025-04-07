import { PersonCompanyRepository } from '../../domain/repositories/person-company.repository';
import { PersonCompany } from '../../domain/entities/person-company.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCompaniesByPersonIdUseCase {
  constructor(private readonly personCompanyRepo: PersonCompanyRepository) {}

  async execute(personId: string): Promise<PersonCompany[]> {
    return this.personCompanyRepo.findCompaniesByPersonId(personId);
  }
}

// src/modules/person-company/application/use-cases/assign-person-to-company.usecase.ts

import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../../company/domain/repositories/company.repository';
import { PersonRepository } from '../../../person/domain/repositories/person.repository';

@Injectable()
export class AssignPersonToCompanyUseCase {
  constructor(
    private readonly personRepo: PersonRepository,
    private readonly companyRepo: CompanyRepository,
  ) {}

  async execute(personId: string, companyId: string): Promise<void> {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new Error('Company not found');

    const person = await this.personRepo.findById(personId);
    if (!person) throw new Error('Person not found');

    person.addCompany(companyId);
    company.addPerson(personId);

    await this.personRepo.update(person);
    await this.companyRepo.update(company);
  }
}

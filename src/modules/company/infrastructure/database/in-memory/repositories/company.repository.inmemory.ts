/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Company } from 'src/modules/company/domain/entities/company.entity';
import { CompanyRepository } from 'src/modules/company/domain/repositories/company.repository';

@Injectable()
export class InMemoryCompanyRepository implements CompanyRepository {
  private persons: Company[] = [];

  async create(person: Company): Promise<Company> {
    this.persons.push(person);
    return person;
  }
}

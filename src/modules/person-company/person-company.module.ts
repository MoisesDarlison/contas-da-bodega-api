import { Module } from '@nestjs/common';

import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';
import { AssignPersonToCompanyUseCase } from './application/use-cases/assign-person-to-company.usecase';
import { PersonCompanyController } from './interfaces/controllers/person-company.controller';

@Module({
  imports: [PersonModule, CompanyModule],
  controllers: [PersonCompanyController],
  providers: [AssignPersonToCompanyUseCase],
})
export class PersonCompanyModule {}

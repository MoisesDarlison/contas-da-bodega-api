import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonCompanyRepository } from './domain/repositories/person-company.repository';

import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';
import { GetCompaniesByPersonIdUseCase } from './application/use-cases/get-companies-by-person-id.usecase';
import { GetPersonsByCompanyIdUseCase } from './application/use-cases/get-persons-by-company-id.usecase';
import { LinkPersonToCompanyUseCase } from './application/use-cases/link-person-to-company.usecase';
import { PersonCompanyRepositoryImpl } from './infrastructure/database/mongodb/repositories/person-company.repository.impl';
import { PersonCompanySchema } from './infrastructure/database/mongodb/schemas/person-company.schema';
import { PersonCompanyController } from './controllers/person-company.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PersonCompany', schema: PersonCompanySchema },
    ]),
    PersonModule,
    CompanyModule,
  ],
  controllers: [PersonCompanyController],
  providers: [
    {
      provide: PersonCompanyRepository,
      useClass: PersonCompanyRepositoryImpl,
    },
    LinkPersonToCompanyUseCase,
    GetCompaniesByPersonIdUseCase,
    GetPersonsByCompanyIdUseCase,
  ],
  exports: [PersonCompanyRepository],
})
export class PersonCompanyModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonCompanyRepository } from './domain/repositories/person-company.repository';

import { LoggerService } from 'src/shared/logging/services/logger.service';
import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';
import { GetCompaniesByPersonIdUseCase } from './application/use-cases/get-companies-by-person-id.usecase';
import { GetPersonsByCompanyIdUseCase } from './application/use-cases/get-persons-by-company-id.usecase';
import { LinkPersonToCompanyUseCase } from './application/use-cases/link-person-to-company.usecase';
import { PersonCompanyController } from './controllers/person-company.controller';
import { PersonCompanyRepositoryImpl } from './infrastructure/database/mongodb/repositories/person-company.repository.impl';
import {
  PersonCompany,
  PersonCompanySchema,
} from './infrastructure/database/mongodb/schemas/person-company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonCompany.name, schema: PersonCompanySchema },
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
    LoggerService,
    LinkPersonToCompanyUseCase,
    GetCompaniesByPersonIdUseCase,
    GetPersonsByCompanyIdUseCase,
  ],
  exports: [PersonCompanyRepository],
})
export class PersonCompanyModule {}

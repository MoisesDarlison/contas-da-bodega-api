import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateCompanyUseCase } from './application/use-cases/create-company.usecase';
import { FindAllCompanyUseCase } from './application/use-cases/find-all-company.usecase';
import { ACompanyRepository } from './domain/contracts/company-repository.abstract';
import { CompanyRepositoryImpl } from './infrastructure/database/mongodb/repositories/company.repository.impl';
import {
  Company,
  CompanySchema,
} from './infrastructure/database/mongodb/schemas/company.schema';
import { CompanyController } from './presentation/controllers/company.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [
    CreateCompanyUseCase,
    FindAllCompanyUseCase,
    {
      provide: ACompanyRepository,
      useClass: CompanyRepositoryImpl,
    },
  ],
  exports: [ACompanyRepository],
})
export class CompanyModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateCompanyUseCase } from './application/use-cases/create-company.usecase';
import { FindAllCompanyUseCase } from './application/use-cases/find-all-company.usecase';
import { CompanyController } from './controllers/company.controller';
import { CompanyRepository } from './domain/repositories/company.repository';
import { CompanyRepositoryImpl } from './infrastructure/database/mongodb/repositories/company.repository.impl';
import {
  Company,
  CompanySchema,
} from './infrastructure/database/mongodb/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [
    CreateCompanyUseCase,
    FindAllCompanyUseCase,
    {
      provide: CompanyRepository,
      useClass: CompanyRepositoryImpl,
    },
  ],
  exports: [CompanyRepository],
})
export class CompanyModule {}

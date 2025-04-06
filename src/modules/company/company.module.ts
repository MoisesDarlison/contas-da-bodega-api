import { Module } from '@nestjs/common';
import { CompanyRepository } from './domain/repositories/company.repository';
import { InMemoryCompanyRepository } from './infrastructure/database/in-memory/repositories/company.repository.inmemory';
import { CompanyController } from './interfaces/controllers/company.controller';
import { CreateCompanyUseCase } from './application/use-cases/create-company.usecase';
import { FindAllCompanyUseCase } from './application/use-cases/find-all-company.usecase';

@Module({
  controllers: [CompanyController],
  providers: [
    CreateCompanyUseCase,
    FindAllCompanyUseCase,
    {
      provide: CompanyRepository,
      useClass: InMemoryCompanyRepository,
    },
  ],
  exports: [CompanyRepository],
})
export class CompanyModule {}

import { Module } from '@nestjs/common';
import { CompanyRepository } from './domain/repositories/company.repository';
import { InMemoryCompanyRepository } from './infrastructure/database/in-memory/repositories/company.repository.inmemory';
import { CompanyController } from './interfaces/controllers/company.controller';
import { CreateCompanyUseCase } from './use-cases/create-company.usecase';

@Module({
  controllers: [CompanyController],
  providers: [
    CreateCompanyUseCase,
    {
      provide: CompanyRepository,
      useClass: InMemoryCompanyRepository,
    },
  ],
})
export class CompanynModule {}

import { Module } from '@nestjs/common';
import { CreatePersonUseCase } from './application/use-cases/create-person.usecase';
import { FindAllPersonUseCase } from './application/use-cases/find-all-person.usecase';
import { PersonRepository } from './domain/repositories/person.repository';
import { InMemoryPersonRepository } from './infrastructure/database/in-memory/repositories/person.repository.inmemory';
import { PersonController } from './interfaces/controllers/person.controller';

@Module({
  controllers: [PersonController],
  providers: [
    CreatePersonUseCase,
    FindAllPersonUseCase,
    {
      provide: PersonRepository,
      useClass: InMemoryPersonRepository,
    },
  ],
  exports: [PersonRepository],
})
export class PersonModule {}

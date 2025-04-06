import { Module } from '@nestjs/common';
import { CreatePersonUseCase } from './application/use-cases/create-person.usecase';
import { PersonRepository } from './domain/repositories/person.repository';
import { InMemoryPersonRepository } from './infrastructure/database/in-memory/repositories/person.repository.inmemory';
import { PersonController } from './interfaces/controllers/person.controller';

@Module({
  controllers: [PersonController],
  providers: [
    CreatePersonUseCase,
    {
      provide: PersonRepository,
      useClass: InMemoryPersonRepository,
    },
  ],
})
export class PersonModule {}

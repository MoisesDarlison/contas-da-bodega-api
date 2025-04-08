import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatePersonUseCase } from './application/use-cases/create-person.usecase';
import { FindAllPersonUseCase } from './application/use-cases/find-all-person.usecase';
import { PersonController } from './controllers/person.controller';
import { PersonRepository } from './domain/repositories/person.repository';
import { PersonRepositoryImpl } from './infrastructure/database/mongodb/repositories/person.repository.impl';
import {
  Person,
  PersonSchema,
} from './infrastructure/database/mongodb/schemas/person.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  controllers: [PersonController],
  providers: [
    CreatePersonUseCase,
    FindAllPersonUseCase,
    {
      provide: PersonRepository,
      useClass: PersonRepositoryImpl,
    },
  ],
  exports: [PersonRepository],
})
export class PersonModule {}

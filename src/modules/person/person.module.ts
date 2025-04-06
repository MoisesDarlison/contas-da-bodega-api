import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatePersonUseCase } from './application/use-cases/create-person.usecase';
import { FindAllPersonUseCase } from './application/use-cases/find-all-person.usecase';
import { PersonRepository } from './domain/repositories/person.repository';
import { PersonRepositoryImpl } from './infrastructure/database/mongodb/repositories/person-impl.repository';
import { PersonSchema } from './infrastructure/database/mongodb/schemas/person.schema';
import { PersonController } from './interfaces/controllers/person.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }]),
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
  exports: [],
})
export class PersonModule {}

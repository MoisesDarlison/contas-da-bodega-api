import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatePersonUseCase } from './application/use-cases/create-person.usecase';
import { PersonRepository } from './domain/repositories/person.repository';
import { PersonMongoRepository } from './infrastructure/database/mongodb/repositories/person-mongo.repository';
import { PersonSchema } from './infrastructure/database/mongodb/schemas/person.schema';
import { PersonController } from './interfaces/controllers/person.controller';
import { FindAllPersonUseCase } from './application/use-cases/find-all-person.usecase';

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
      useClass: PersonMongoRepository,
    },
  ],
  exports: [PersonRepository],
})
export class PersonModule {}

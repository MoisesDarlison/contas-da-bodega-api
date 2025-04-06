import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonRepository } from 'src/modules/person/domain/repositories/person.repository';
import { Person } from 'src/modules/person/domain/entities/person.entity';

@Injectable()
export class PersonMongoRepository implements PersonRepository {
  constructor(
    @InjectModel('Person') private readonly personModel: Model<Person>,
  ) {}

  async create(person: Person): Promise<Person> {
    return await this.personModel.create({
      _id: person.getId(),
      name: person['name'],
      email: person['email'],
      phone: person['phone'],
      type: person['type'],
      isActive: person['isActive'],
      createdAt: person['createdAt'],
      updatedAt: person['updatedAt'],
      deletedAt: person['deletedAt'],
    });
  }

  async findAll(): Promise<Person[]> {
    return await this.personModel.find();
  }
}

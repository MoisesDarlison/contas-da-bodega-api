import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from 'src/modules/person/domain/entities/person.entity';
import { PersonRepository } from 'src/modules/person/domain/repositories/person.repository';
import { PersonDocument } from '../contracts/person-document.contract';

@Injectable()
export class PersonRepositoryImpl implements PersonRepository {
  private toEntity = (data: PersonDocument): Person => {
    return Person.clone(data);
  };

  constructor(
    @InjectModel('Person') private readonly personModel: Model<PersonDocument>,
  ) {}

  async create(person: Person): Promise<Person> {
    const doc: PersonDocument = await this.personModel.create({
      _id: person.getId(),
      name: person['name'],
      email: person['email'],
      phone: person['phone'],
      isActive: person['isActive'],
      createdAt: person['createdAt'],
      updatedAt: person['updatedAt'],
    });

    return this.toEntity(doc);
  }

  async findAll(): Promise<Person[]> {
    const docs = await this.personModel.find();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<Person | null> {
    const doc = await this.personModel.findById(id);
    if (!doc) return null;
    return this.toEntity(doc);
  }
}

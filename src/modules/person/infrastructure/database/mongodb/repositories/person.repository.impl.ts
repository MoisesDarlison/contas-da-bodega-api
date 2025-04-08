import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from 'src/modules/person/domain/entities/person.entity';
import { PersonRepository } from 'src/modules/person/domain/repositories/person.repository';
import { PersonDocument } from '../contracts/person-document.contract';

@Injectable()
export class PersonRepositoryImpl implements PersonRepository {
  private toEntity = (data: PersonDocument): Person => {
    return Person.clone(data._id, data);
  };

  constructor(
    @InjectModel('Person') private readonly personModel: Model<PersonDocument>,
  ) {}

  async create(person: Person): Promise<Person> {
    const doc: PersonDocument = await this.personModel.create({
      id: person.getId(),
      name: person['name'],
      email: person['email'],
      phone: person['phone'],
      isActive: person['isActive'],
      createdAt: person['createdAt'],
      updatedAt: person['updatedAt'],
    });

    return this.toEntity(doc);
  }

  async findById(id: string): Promise<Person | null> {
    const doc = await this.personModel.findById(id);
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ docs: Person[]; total: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.personModel.find().skip(skip).limit(limit).lean(),
      this.personModel.countDocuments(),
    ]);
    return {
      docs: docs.map(this.toEntity),
      total,
    };
  }
}

// src/infra/database/repositories/person-company.repository.impl.ts
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonCompany } from 'src/modules/person-company/domain/entities/person-company.entity';
import { PersonCompanyRepository } from 'src/modules/person-company/domain/repositories/person-company.repository';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { PersonCompanyDocument } from '../contracts/person-company-document.contract';

export class PersonCompanyRepositoryImpl implements PersonCompanyRepository {
  private toEntity = (data: PersonCompanyDocument): PersonCompany => {
    return PersonCompany.clone(data);
  };

  constructor(
    private readonly logger: LoggerService,
    @InjectModel('PersonCompany')
    private readonly model: Model<PersonCompanyDocument>,
  ) {}

  async create(link: PersonCompany): Promise<void> {
    const prefix = `${PersonCompanyRepositoryImpl.name}.${this.create.name}`;
    this.logger.log('Person and Company DB', prefix);

    await this.model.create({
      personId: link.getPersonId(),
      companyId: link.getCompanyId(),
      permissionType: link.getPermissionType(),
    });
  }

  async findCompaniesByPersonId(personId: string): Promise<PersonCompany[]> {
    const prefix = `${PersonCompanyRepositoryImpl.name}.${this.findCompaniesByPersonId.name}`;
    this.logger.log('Person and Company DB', prefix);

    const docs = await this.model.find({ personId }).lean();
    return docs.map((doc) => this.toEntity(doc));
  }

  async findPersonsByCompanyId(companyId: string): Promise<PersonCompany[]> {
    const prefix = `${PersonCompanyRepositoryImpl.name}.${this.findPersonsByCompanyId.name}`;
    this.logger.log('Person and Company DB', prefix);

    const docs = await this.model.find({ companyId }).lean();
    return docs.map((doc) => this.toEntity(doc));
  }

  async findLinkByPersonIdAndCompanyId(
    personId: string,
    companyId: string,
  ): Promise<PersonCompany | null> {
    const prefix = `${PersonCompanyRepositoryImpl.name}.${this.findLinkByPersonIdAndCompanyId.name}`;
    this.logger.log('Person and Company DB', prefix);

    const doc = await this.model.findOne({ personId, companyId }).lean();
    if (!doc) return null;
    return this.toEntity(doc);
  }
}

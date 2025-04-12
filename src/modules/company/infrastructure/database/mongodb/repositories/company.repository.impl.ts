import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ACompanyRepository } from 'src/modules/company/domain/contracts/company-repository.abstract';
import { Company } from 'src/modules/company/domain/entities/company.entity';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { CompanyDocument } from '../contracts/company-document.contract';

@Injectable()
export class CompanyRepositoryImpl implements ACompanyRepository {
  private toEntity = (data: CompanyDocument): Company => {
    return Company.clone(data._id, data);
  };

  constructor(
    private readonly logger: LoggerService,
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async create(company: Company): Promise<Company> {
    const prefix = `${CompanyRepositoryImpl.name}.${this.create.name}`;
    this.logger.log('Companies DB', prefix);

    const input = company.toObject();
    const doc: CompanyDocument = await this.companyModel.create(input);
    return this.toEntity(doc);
  }

  async findById(id: string): Promise<Company | null> {
    const prefix = `${CompanyRepositoryImpl.name}.${this.findById.name}`;
    this.logger.log('Companies DB', prefix);

    const doc = await this.companyModel.findById(id);
    if (!doc || doc.deletedAt) return null;
    return this.toEntity(doc);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Company[]> {
    const prefix = `${CompanyRepositoryImpl.name}.${this.findAll.name}`;
    this.logger.log('Companies DB', prefix);

    const skip = (page - 1) * limit;
    const docs = await this.companyModel
      .find({ deletedAt: null })
      .skip(skip)
      .limit(limit)
      .lean();
    return docs.map(this.toEntity);
  }

  async countDocuments(): Promise<number> {
    const prefix = `${CompanyRepositoryImpl.name}.${this.countDocuments.name}`;
    this.logger.log('Companies DB', prefix);
    return await this.companyModel.countDocuments();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/modules/company/domain/entities/company.entity';
import { ICompanyRepository } from 'src/modules/company/domain/repositories/company.repository';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { CompanyDocument } from '../contracts/company-document.contract';

@Injectable()
export class CompanyRepositoryImpl implements ICompanyRepository {
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

    const doc: CompanyDocument = await this.companyModel.create({
      id: company.getId(),
      name: company['name'],
      email: company.getEmail(),
      phone: company['phone'],
    });
    return this.toEntity(doc);
  }

  async findById(id: string): Promise<Company | null> {
    const prefix = `${CompanyRepositoryImpl.name}.${this.findById.name}`;
    this.logger.log('Companies DB', prefix);

    const doc = await this.companyModel.findById(id);
    if (!doc || doc.deletedAt) return null;
    return this.toEntity(doc);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ docs: Company[]; total: number }> {
    const prefix = `${CompanyRepositoryImpl.name}.${this.findAll.name}`;
    this.logger.log('Companies DB', prefix);

    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.companyModel
        .find({ deletedAt: null })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.companyModel.countDocuments(),
    ]);
    return {
      docs: docs.map(this.toEntity),
      total: total,
    };
  }
}

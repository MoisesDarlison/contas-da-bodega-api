import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/modules/company/domain/entities/company.entity';
import { CompanyRepository } from 'src/modules/company/domain/repositories/company.repository';
import { CompanyDocument } from '../contracts/company-document.contract';

@Injectable()
export class CompanyRepositoryImpl implements CompanyRepository {
  private toEntity = (data: CompanyDocument): Company => {
    return Company.clone(data._id, data);
  };

  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async create(company: Company): Promise<Company> {
    const doc: CompanyDocument = await this.companyModel.create({
      id: company.getId(),
      name: company['name'],
      email: company['email'],
      sharingIdentifier: company.getSharingIdentifier(),
      isActive: company.isCompanyActive(),
      phone: company['phone'],
    });
    return this.toEntity(doc);
  }

  async findById(id: string): Promise<Company | null> {
    const doc = await this.companyModel.findById(id);
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ docs: Company[]; total: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.companyModel.find().skip(skip).limit(limit).lean(),
      this.companyModel.countDocuments(),
    ]);
    return {
      docs: docs.map(this.toEntity),
      total: total,
    };
  }
}

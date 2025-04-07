import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyRepository } from 'src/modules/company/domain/repositories/company.repository';
import { Company } from 'src/modules/company/domain/entities/company.entity';
import { Injectable } from '@nestjs/common';
import { CompanyDocument } from '../contracts/company-document.contract';

@Injectable()
export class CompanyRepositoryImpl implements CompanyRepository {
  private toEntity = (data: CompanyDocument): Company => {
    return Company.clone(data);
  };

  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async create(company: Company): Promise<Company> {
    const doc: CompanyDocument = await this.companyModel.create({
      _id: company.getId(),
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

  async findAll(): Promise<Company[]> {
    const docs: CompanyDocument[] = await this.companyModel.find();
    return docs.map(this.toEntity);
  }
}

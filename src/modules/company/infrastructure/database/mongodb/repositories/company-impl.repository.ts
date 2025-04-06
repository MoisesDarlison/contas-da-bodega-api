import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyRepository } from 'src/modules/company/domain/repositories/company.repository';
import { Company } from 'src/modules/company/domain/entities/company.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepositoryImpl implements CompanyRepository {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<Company>,
  ) {}

  async create(company: Company): Promise<Company> {
    return await this.companyModel.create({
      _id: company.getId(),
      name: company['name'],
      email: company['email'],
      sharingIdentifier: company.getSharingIdentifier(),
      isActive: company.isCompanyActive(),
      phone: company['phone'],
    });
  }

  async findAll(): Promise<Company[]> {
    return await this.companyModel.find();
  }
}

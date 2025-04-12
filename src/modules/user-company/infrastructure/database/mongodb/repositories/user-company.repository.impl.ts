import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCompany } from 'src/modules/user-company/domain/entities/user-company.entity';
import { IUserCompanyRepository } from 'src/modules/user-company/domain/repositories/user-company.repository';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { UserCompanyDocument } from '../contracts/user-company-document.contract';

export class UserCompanyRepositoryImpl implements IUserCompanyRepository {
  private toEntity = (data: UserCompanyDocument): UserCompany => {
    return UserCompany.clone(data);
  };

  constructor(
    private readonly logger: LoggerService,
    @InjectModel('UserCompany')
    private readonly model: Model<UserCompanyDocument>,
  ) {}

  async create(link: UserCompany): Promise<void> {
    const prefix = `${UserCompanyRepositoryImpl.name}.${this.create.name}`;
    this.logger.log('User and Company DB', prefix);
    await this.model.create({
      userId: link.getUserId(),
      companyId: link.getCompanyId(),
      permissionType: link.getPermissionType(),
      isActive: link['isActive'],
      editorInfo: link['editorInfo'],
    });
  }

  async findCompaniesByUserId(userId: string): Promise<UserCompany[]> {
    const prefix = `${UserCompanyRepositoryImpl.name}.${this.findCompaniesByUserId.name}`;
    this.logger.log('User and Company DB', prefix);

    const docs = await this.model.find({ userId }).lean();
    return docs.map((doc) => this.toEntity(doc));
  }

  async findUsersByCompanyId(companyId: string): Promise<UserCompany[]> {
    const prefix = `${UserCompanyRepositoryImpl.name}.${this.findUsersByCompanyId.name}`;
    this.logger.log('User and Company DB', prefix);

    const docs = await this.model.find({ companyId }).lean();
    return docs.map((doc) => this.toEntity(doc));
  }

  async findLinkByUserIdAndCompanyId(
    userId: string,
    companyId: string,
  ): Promise<UserCompany | null> {
    const prefix = `${UserCompanyRepositoryImpl.name}.${this.findLinkByUserIdAndCompanyId.name}`;
    this.logger.log('User and Company DB', prefix);

    const doc = await this.model
      .findOne({ userId, companyId, deletedAt: null })
      .lean();
    if (!doc) return null;
    return this.toEntity(doc);
  }
}

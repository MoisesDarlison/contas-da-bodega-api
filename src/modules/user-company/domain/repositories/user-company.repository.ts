import { UserCompany } from '../entities/user-company.entity';

export abstract class IUserCompanyRepository {
  abstract create(link: UserCompany): Promise<void>;
  abstract findLinkByUserIdAndCompanyId(
    userId: string,
    companyId: string,
  ): Promise<UserCompany | null>;
  abstract findCompaniesByUserId(userId: string): Promise<UserCompany[]>;
  abstract findUsersByCompanyId(companyId: string): Promise<UserCompany[]>;
}

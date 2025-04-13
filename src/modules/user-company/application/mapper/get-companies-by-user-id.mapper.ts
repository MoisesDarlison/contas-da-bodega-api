import { UserCompany } from '../../domain/entities/user-company.entity';
import { IGetCompaniesByUserIdUseCaseOutput } from '../contracts/get-companies-by-user-id.contract';

export function userCompanyDomainToApplication(
  userCompany: UserCompany,
): IGetCompaniesByUserIdUseCaseOutput {
  const output = userCompany.toObject();
  return {
    userId: output.userId,
    companyId: output.companyId,
    isActive: output.isActive,
    permissionType: output.permissionType,
    editorInfo: {
      userid: output.editorInfo.userid,
      updatedAt: output.editorInfo.updatedAt,
    },
  };
}

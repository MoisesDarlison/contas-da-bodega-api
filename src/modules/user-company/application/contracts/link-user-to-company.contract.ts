import { PermissionTypesEnum } from 'src/shared/domain/enums/permission-types.enum';

export interface ILinkUserToCompanyUseCaseInput {
  userId: string;
  companyId: string;
  permissionType: PermissionTypesEnum;
}

import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export interface ILinkUserToCompanyUseCaseInput {
  userId: string;
  companyId: string;
  permissionType: PermissionTypesEnum;
}

import { PermissionTypesEnum } from 'src/shared/domain/enums/permission-types.enum';

export interface IGetCompaniesByUserIdUseCaseOutput {
  userId: string;
  companyId: string;
  isActive: boolean;
  permissionType?: PermissionTypesEnum;
  editorInfo: {
    userid: string;
    updatedAt: Date;
  };
}

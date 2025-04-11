import { Document } from 'mongoose';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export interface UserCompanyDocument extends Document {
  userId: string;
  companyId: string;
  permissionType: PermissionTypesEnum;
  createdAt: Date;
  updatedAt: Date;
}

import { Document } from 'mongoose';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export interface PersonCompanyDocument extends Document {
  personId: string;
  companyId: string;
  permissionType: PermissionTypesEnum;
  createdAt: Date;
  updatedAt: Date;
}

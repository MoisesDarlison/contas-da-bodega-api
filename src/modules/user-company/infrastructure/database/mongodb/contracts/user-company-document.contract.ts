import { Document } from 'mongoose';
import { PermissionTypesEnum } from 'src/shared/domain/enums/permission-types.enum';
interface IEditorInfo {
  userid: string;
  updatedAt: Date;
}

export interface UserCompanyDocument extends Document {
  userId: string;
  companyId: string;
  permissionType: PermissionTypesEnum;
  isActive: boolean;
  editorInfo: IEditorInfo;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export type UserCompanyDocument = HydratedDocument<UserCompany>;

interface IEditorInfo {
  userid: string;
  updatedAt: Date;
}

@Schema({
  collection: 'users_companies',
  timestamps: true,
})
export class UserCompany {
  @Prop({ type: String, required: true, ref: 'User', index: true })
  userId: string;

  @Prop({ type: String, required: true, ref: 'Company', index: true })
  companyId: string;

  @Prop({ type: String, enum: PermissionTypesEnum, required: true })
  permissionType: PermissionTypesEnum;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({
    type: {
      userid: { type: String, required: true },
      updatedAt: { type: Date, required: true },
    },
    _id: false,
    required: true,
  })
  editorInfo: IEditorInfo;

  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
}

export const UserCompanySchema = SchemaFactory.createForClass(UserCompany);

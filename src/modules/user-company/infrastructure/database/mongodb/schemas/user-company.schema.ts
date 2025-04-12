import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export type UserCompanyDocument = HydratedDocument<UserCompany>;

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

  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
}

export const UserCompanySchema = SchemaFactory.createForClass(UserCompany);

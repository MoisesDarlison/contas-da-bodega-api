import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export type UserCompanyDocument = HydratedDocument<UserCompany>;

@Schema({
  collection: 'users_companies',
  timestamps: true,
})
export class UserCompany {
  @Prop({ type: String, required: true, ref: 'User' })
  userId: string;

  @Prop({ type: String, required: true, ref: 'Company' })
  companyId: string;

  @Prop({ type: String, enum: PermissionTypesEnum, required: true })
  permissionType: PermissionTypesEnum;
}

export const UserCompanySchema = SchemaFactory.createForClass(UserCompany);

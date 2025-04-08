import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export type PersonCompanyDocument = HydratedDocument<PersonCompany>;

@Schema({
  collection: 'persons_companies',
  timestamps: true,
})
export class PersonCompany {
  @Prop({ type: String, required: true, ref: 'Person' })
  personId: string;

  @Prop({ type: String, required: true, ref: 'Company' })
  companyId: string;

  @Prop({ type: String, enum: PermissionTypesEnum, required: true })
  permissionType: PermissionTypesEnum;
}

export const PersonCompanySchema = SchemaFactory.createForClass(PersonCompany);

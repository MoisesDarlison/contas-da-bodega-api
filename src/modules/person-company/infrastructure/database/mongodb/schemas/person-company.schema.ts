import { Schema } from 'mongoose';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export const PersonCompanySchema = new Schema(
  {
    personId: { type: String, required: true, ref: 'Person' },
    companyId: { type: String, required: true, ref: 'Company' },
    permissionType: {
      type: String,
      enum: Object.values(PermissionTypesEnum),
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: 'persons_companies',
  },
);

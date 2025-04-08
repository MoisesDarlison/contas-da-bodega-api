import { Schema } from 'mongoose';

export const CompanySchema = new Schema(
  {
    _id: { type: String, alias: 'id' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    sharingIdentifier: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    phone: { type: String },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
    collection: 'companies',
  },
);

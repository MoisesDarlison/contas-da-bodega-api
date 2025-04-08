import { Document } from 'mongoose';

export interface CompanyDocument extends Document {
  _id: string;
  sharingIdentifier: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  phone?: string;
  deletedAt?: Date | null;
}

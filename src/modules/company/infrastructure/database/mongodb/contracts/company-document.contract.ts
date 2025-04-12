import { Document } from 'mongoose';

export interface CompanyDocument extends Document {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  phone?: string;
  deletedAt?: Date | null;
}

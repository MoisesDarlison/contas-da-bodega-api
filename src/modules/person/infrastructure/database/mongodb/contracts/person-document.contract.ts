import { Document } from 'mongoose';

export interface PersonDocument extends Document {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  phone: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

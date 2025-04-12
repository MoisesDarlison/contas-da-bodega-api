import { Document } from 'mongoose';

export interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

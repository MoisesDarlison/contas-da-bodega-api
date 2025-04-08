import { Schema } from 'mongoose';

export const PersonSchema = new Schema(
  {
    _id: { type: String, alias: 'id' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    isActive: { type: Boolean, default: true },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
    collection: 'persons',
  },
);

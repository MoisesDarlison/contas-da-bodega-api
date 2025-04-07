import { Schema } from 'mongoose';

export const PersonSchema = new Schema(
  {
    _id: { type: String, alias: 'id' }, // usamos o UUID gerado
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    phone: { type: String },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
    collection: 'persons',
  },
);

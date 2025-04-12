import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({
  collection: 'companies',
  timestamps: true,
})
export class Company {
  @Prop({ type: String, required: true, alias: 'id' })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

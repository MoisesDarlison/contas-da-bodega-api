import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonDocument = HydratedDocument<Person>;

@Schema({
  collection: 'persons',
  timestamps: true,
})
export class Person {
  @Prop({ type: String, alias: 'id' })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  phone?: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);

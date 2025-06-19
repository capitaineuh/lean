import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tender extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: String, ref: 'User', required: true })
  clientId: string;

  @Prop({ default: 'OPEN' })
  status: 'OPEN' | 'CLOSED' | 'AWARDED';

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  applicants: string[];
}

export const TenderSchema = SchemaFactory.createForClass(Tender); 
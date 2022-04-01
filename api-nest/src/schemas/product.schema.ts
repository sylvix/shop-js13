import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ ref: 'Category', required: true })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AmenityDocument = Amenity & Document;

@Schema({ versionKey: false, timestamps: true })
export class Amenity {
  @Prop({ required: true, unique: true, index: true })
  name: string;
}

export const AmenitySchema = SchemaFactory.createForClass(Amenity);

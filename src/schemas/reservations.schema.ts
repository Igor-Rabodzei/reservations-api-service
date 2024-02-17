import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Amenity } from './amenity.schema';
import { User } from './user.schema';

export type ReservationDocument = Reservation & Document;

@Schema({ versionKey: false, timestamps: true })
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'Amenity', index: true })
  amenityId: Amenity | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId: User | Types.ObjectId;

  @Prop({ required: true })
  startTime: number;

  @Prop({ required: true })
  endTime: number;

  @Prop({ required: true })
  reservationDate: Date;
}

export const ReservationsSchema = SchemaFactory.createForClass(Reservation);

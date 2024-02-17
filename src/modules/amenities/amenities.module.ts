import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AmenitySchema, Amenity } from 'src/schemas/amenity.schema';
import { AmenitiesService } from './amenities.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Amenity.name, schema: AmenitySchema }]),
  ],
  controllers: [],
  providers: [AmenitiesService],
  exports: [AmenitiesService],
})
export class AmenitiesModule {}

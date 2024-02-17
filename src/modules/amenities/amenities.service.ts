import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { AmenityDocument, Amenity } from 'src/schemas/amenity.schema';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectModel(Amenity.name)
    private amenityModel: Model<AmenityDocument>,
  ) {}

  async getAmenityById(amenityId: string) {
    return await this.amenityModel.findOne({
      _id: new Types.ObjectId(amenityId),
    });
  }
}

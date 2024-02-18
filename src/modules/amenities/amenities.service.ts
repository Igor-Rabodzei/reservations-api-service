import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AmenityDocument, Amenity } from 'src/schemas/amenity.schema';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectModel(Amenity.name)
    private amenityModel: Model<AmenityDocument>,
  ) {}

  async getAmenityByName(amenityName: string) {
    return await this.amenityModel.findOne({
      name: amenityName,
    });
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

import {
  ReservationDocument,
  Reservation,
} from 'src/schemas/reservations.schema';
import { IPagination } from 'src/common/interfaces/pagination';
import { minutesToHHMM, timestampToStartDay } from 'src/common/helpers/time';

import { AmenitiesService } from '../amenities/amenities.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { AmenityDocument } from 'src/schemas/amenity.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private amenitiesService: AmenitiesService,
  ) {}

  async searchReservations(
    amenityId: string,
    timestamp: string,
    pagination: IPagination,
  ) {
    try {
      const skip = pagination.pageSize * pagination.pageNumber;
      const limit = pagination.pageSize;
      const reservations: ReservationDocument[] = await this.reservationModel
        .find({
          amenityId: new Types.ObjectId(amenityId),
          reservationDate: timestampToStartDay(timestamp),
        })
        .skip(skip)
        .limit(limit)
        .sort({ startTime: 1 })
        .populate('amenityId');

      const result = reservations.map((item: any) => {
        return {
          reservationId: item?._id,
          userId: item?.userId,
          startTime: minutesToHHMM(item?.startTime),
          duration: item?.endTime - item?.startTime,
          name: item?.amenityId?.name,
        };
      });

      return result;
    } catch (err) {
      throw new HttpException(
        'An error occurred while processing your request.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReservationsByUserId(userId: string, pagination: IPagination) {
    try {
      const skip = pagination.pageSize * pagination.pageNumber;
      const limit = pagination.pageSize;
      const reservations = await this.reservationModel.aggregate([
        { $match: { userId: new Types.ObjectId(userId) } },
        { $skip: skip },
        { $limit: limit },
        {
          $group: {
            _id: '$reservationDate',
            reservations: { $addToSet: '$$ROOT' },
          },
        },
      ]);
      return reservations;
    } catch (err) {
      throw new HttpException(
        'An error occurred while processing your request.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createReservation({
    userId,
    amenityName,
    startTime,
    endTime,
    reservationDate,
  }: CreateReservationDto): Promise<any> {
    try {
      const amenity: AmenityDocument | null =
        await this.amenitiesService.getAmenityByName(amenityName);

      if (!amenity) {
        throw new HttpException(
          'Amenity does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const reservation: ReservationDocument = new this.reservationModel({
        userId: new Types.ObjectId(userId),
        startTime,
        amenityId: new Types.ObjectId(amenity?._id),
        endTime,
        reservationDate: timestampToStartDay(reservationDate),
      });

      await reservation.save();

      return reservation;
    } catch (err) {
      throw new HttpException(
        'An error occurred while processing your request.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

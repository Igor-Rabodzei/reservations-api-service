import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AmenitiesModule } from 'src/modules/amenities/amenities.module';
import { MongooseModule } from '@nestjs/mongoose';

import { AmenitySchema, Amenity } from 'src/schemas/amenity.schema';
import {
  ReservationsSchema,
  Reservation,
} from 'src/schemas/reservations.schema';
import { PaginationMiddleware } from 'src/common/middlewares/pagination.middleware';

import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Amenity.name, schema: AmenitySchema },
      { name: Reservation.name, schema: ReservationsSchema },
    ]),
    AmenitiesModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes(
      {
        path: '/api/v1/reservations/search',
        method: RequestMethod.GET,
      },
      {
        path: '/api/v1/reservations/user/:userId',
        method: RequestMethod.GET,
      },
    );
  }
}

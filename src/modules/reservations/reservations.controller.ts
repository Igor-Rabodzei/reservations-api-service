import { Controller, Get, Param, Query } from '@nestjs/common';

import { IPagination } from 'src/common/interfaces/pagination';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { ReservationsService } from './reservations.service';

@Controller('/api/v1/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('search')
  async searchReservationsByAmenityIdAndTimestamp(
    @Query('amenityId') amenityId: string,
    @Query('timestamp') timestamp: string,
    @Pagination() pagination: IPagination,
  ): Promise<any> {
    const data = await this.reservationsService.searchReservations(
      amenityId,
      timestamp,
      pagination,
    );
    return data;
  }

  @Get('user/:userId')
  async getReservationsByUserId(
    @Param('userId') userId: string,
    @Pagination() pagination: IPagination,
  ) {
    const data = await this.reservationsService.getReservationsByUserId(
      userId,
      pagination,
    );
    return data;
  }
}

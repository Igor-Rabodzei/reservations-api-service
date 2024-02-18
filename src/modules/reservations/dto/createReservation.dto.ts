import { IsString, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  userId: string;

  @IsString()
  amenityName: string;

  @IsNumber()
  startTime: number;

  @IsNumber()
  endTime: number;

  @IsNumber()
  reservationDate: string;
}

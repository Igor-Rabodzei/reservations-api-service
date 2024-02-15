import { Controller } from '@nestjs/common';

import { ReservationsService } from './reservations.service';

@Controller('/api/v1/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
}

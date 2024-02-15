import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { ReservationsModule } from 'src/modules/reservations/reservations.module';

@Module({
  imports: [AuthModule, UserModule, ReservationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

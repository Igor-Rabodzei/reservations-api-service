import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { AmenitiesModule } from 'src/modules/amenities/amenities.module';
import { FileManagerModule } from './modules/fileManager/fileManager.module';
import { ReservationsModule } from 'src/modules/reservations/reservations.module';
import paginationConfig from 'config/pagination.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [paginationConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGO_CONNECTION_URL,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    ReservationsModule,
    AmenitiesModule,
    FileManagerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { BuildingTypesModule } from './building-types/building-types.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomOccupiedPeriodsModule } from './room-occupied-periods/room-occupied-periods.module';
import { BookingRequestsModule } from './booking-requests/booking-requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    DbModule,
    UsersModule,
    RolesModule,
    UserRolesModule,
    BuildingTypesModule,
    RoomsModule,
    RoomOccupiedPeriodsModule,
    BookingRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

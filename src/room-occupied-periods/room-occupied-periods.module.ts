import { Module } from '@nestjs/common';
import { RoomOccupiedPeriodsService } from './room-occupied-periods.service';
import { RoomOccupiedPeriodsController } from './room-occupied-periods.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [RoomOccupiedPeriodsService],
  controllers: [RoomOccupiedPeriodsController],
})
export class RoomOccupiedPeriodsModule {}

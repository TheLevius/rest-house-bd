import { Module } from '@nestjs/common';
import { BookingRequestsService } from './booking-requests.service';
import { BookingRequestsController } from './booking-requests.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [BookingRequestsService],
  controllers: [BookingRequestsController],
})
export class BookingRequestsModule {}

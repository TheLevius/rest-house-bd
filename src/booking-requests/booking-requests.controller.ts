import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { BookingRequestsService } from './booking-requests.service';
import { UpdateBookingRequestDto } from './dto/update-booking-request.dto';
import { CreateBookingRequestDto } from './dto/create-booking-request.dto';

@Controller('booking-requests')
export class BookingRequestsController {
  constructor(
    private readonly bookingRequestsService: BookingRequestsService,
  ) {}
  @Get()
  public getAll() {
    return this.bookingRequestsService.findAll();
  }
  @Get(':id')
  public getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.bookingRequestsService.findOneById(id);
  }
  public create(@Body() dto: CreateBookingRequestDto) {
    return this.bookingRequestsService.create(dto);
  }
  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookingRequestDto,
  ) {
    return this.bookingRequestsService.update(id, dto);
  }
  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookingRequestsService.delete(id);
  }
}

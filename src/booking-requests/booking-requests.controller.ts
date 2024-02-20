import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookingRequestsService } from './booking-requests.service';
import { UpdateBookingRequestDto } from './dto/update-booking-request.dto';
import { CreateBookingRequestDto } from './dto/create-booking-request.dto';
import { QueryParamsTransformPipe } from 'src/room-occupied-periods/validations/query-params.pipe';
import { QueryBookingRequestDto } from './dto/query-params.dto';

@Controller('booking-requests')
export class BookingRequestsController {
  constructor(
    private readonly bookingRequestsService: BookingRequestsService,
  ) {}
  @Get()
  public getAll(
    @Query(QueryParamsTransformPipe) queryParams: QueryBookingRequestDto,
  ) {
    return this.bookingRequestsService.findAll(queryParams);
  }
  @Get(':id')
  public getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.bookingRequestsService.findOneById(id);
  }
  @Post()
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

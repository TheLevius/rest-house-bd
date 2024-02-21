import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BookingRequestsService } from './booking-requests.service';
import { UpdateBookingRequestDto } from './dto/update-booking-request.dto';
import { CreateBookingRequestDto } from './dto/create-booking-request.dto';
import { QueryBookingRequestDto } from './dto/query-params.dto';
import { QueryParamsTransformPipe } from './pipes/query-params.pipe';

@Controller('booking-requests')
export class BookingRequestsController {
  constructor(
    private readonly bookingRequestsService: BookingRequestsService,
  ) {}
  @Get()
  public getAll(
    @Query(
      QueryParamsTransformPipe,
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        skipMissingProperties: true,
      }),
    )
    queryParams: QueryBookingRequestDto,
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
  @HttpCode(204)
  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookingRequestsService.delete(id);
  }
}

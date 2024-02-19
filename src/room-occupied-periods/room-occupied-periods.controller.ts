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
import { RoomOccupiedPeriodsService } from './room-occupied-periods.service';
import {
  CreateRoomOccupiedPeriodDto,
  UpdateRoomOccupiedPeriodDto,
} from './dto/room-occupied-period.dto';
import { QueryParamsTransformPipe } from './validations/query-params.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Room Occupied Periods')
@Controller('room-occupied-periods')
export class RoomOccupiedPeriodsController {
  constructor(
    private readonly roomOccupiedPeriodsService: RoomOccupiedPeriodsService,
  ) {}

  @Get()
  public getAll(
    @Query(
      QueryParamsTransformPipe,
      new ValidationPipe({
        skipMissingProperties: true,
      }),
    )
    queryParams: CreateRoomOccupiedPeriodDto,
  ) {
    if (Object.keys(queryParams).length > 0) {
      return this.roomOccupiedPeriodsService.findAllByQueryParams(queryParams);
    } else {
      return this.roomOccupiedPeriodsService.findAll();
    }
  }
  @Get(':id')
  public getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.roomOccupiedPeriodsService.findOneById(id);
  }

  @Post()
  public create(@Body() dto: CreateRoomOccupiedPeriodDto) {
    return this.roomOccupiedPeriodsService.create(dto);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoomOccupiedPeriodDto,
  ) {
    return this.roomOccupiedPeriodsService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.roomOccupiedPeriodsService.delete(id);
  }
}

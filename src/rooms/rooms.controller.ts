import { CreateRoomDto } from './dto/create-rooms.dto';
import { QueryParamsRoomDto } from './dto/query-params-rooms.dto';
import { UpdateRoomDto } from './dto/update-rooms.dto';
import { RoomsService } from './rooms.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @Get()
  public getAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    queryParams: QueryParamsRoomDto,
  ) {
    if (Object.keys(queryParams).length > 0) {
      return this.roomsService.findAllByQueryParams(queryParams);
    } else {
      return this.roomsService.findAll();
    }
  }
  @Get(':id')
  public getOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsService.findOneById(id);
  }
  @Post()
  public create(@Body() dto: CreateRoomDto) {
    return this.roomsService.create(dto);
  }
  @Put(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoomDto,
  ) {
    return this.roomsService.update(id, dto);
  }
  @Delete()
  public delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsService.delete(id);
  }
}

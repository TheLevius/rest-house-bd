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
} from '@nestjs/common';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @Get()
  public getAll(@Query() params: QueryParamsRoomDto) {
    if (params) {
      return this.roomsService.findAllByQueryParams(params);
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

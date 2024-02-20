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
} from '@nestjs/common';
import { BuildingTypesService } from './building-types.service';
import { CreateBuildingTypeDto } from './dto/create-building-type.dto';
import { UpdateBuildingTypeDto } from './dto/update-building-type.dto';
import { QueryBuildingTypeDto } from './dto/query-building-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Building types')
@Controller('building-types')
export class BuildingTypesController {
  constructor(private readonly buildingTypeService: BuildingTypesService) {}

  @Get()
  public getAll(@Query() params: QueryBuildingTypeDto) {
    if (params?.type) {
      return this.buildingTypeService.getOneByType(params.type);
    } else {
      return this.buildingTypeService.getAll();
    }
  }

  @Get(':id')
  public getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.buildingTypeService.getOneById(id);
  }

  @Post()
  public create(@Body() dto: CreateBuildingTypeDto) {
    return this.buildingTypeService.create(dto);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBuildingTypeDto,
  ) {
    return this.buildingTypeService.update(id, dto);
  }
  @HttpCode(204)
  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.buildingTypeService.delete(id);
  }
}

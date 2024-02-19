import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';

const paramOptions = {
  name: 'id',
  description: 'Role ID',
  example: '1',
  format: 'int32',
};
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Roles' })
  async getAll(@Query('role') roleTitle?: string) {
    return this.rolesService.findAll(roleTitle);
  }
  @ApiOperation({ summary: 'Get Role By Id' })
  @ApiParam(paramOptions)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOneById(id);
  }

  @ApiOperation({ summary: 'Create Role' })
  @ApiBody({ type: RoleDto })
  @Post()
  async create(@Body() dto: RoleDto) {
    return this.rolesService.create(dto);
  }
  @ApiOperation({ summary: 'Update Role by Id' })
  @ApiBody({ type: RoleDto })
  @ApiParam(paramOptions)
  @Patch(':id')
  async patch(@Param('id', ParseIntPipe) id: number, @Body() dto: RoleDto) {
    return this.rolesService.update(id, dto);
  }
  @ApiOperation({ summary: 'Delete Role by Id' })
  @ApiParam(paramOptions)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.delete(id);
  }
}

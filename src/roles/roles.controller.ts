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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  async getAll() {
    return this.rolesService.findAll();
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOneById(id);
  }
  @Get()
  async getOneByRole(@Query('find') role: string) {
    return this.rolesService.findOneByRole(role);
  }
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }
  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, dto);
  }
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.delete(id);
  }
}

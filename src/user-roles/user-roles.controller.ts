import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRolesQueryDto } from './dto/query-params.dto';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}
  @Get()
  public async getAll(@Query() params: UserRolesQueryDto) {
    if (params.role) {
      return this.userRolesService.findAllByRole(params.role);
    } else if (params.userid) {
      return this.userRolesService.findAllByUserId(params.userid);
    } else {
      return this.userRolesService.findAll();
    }
  }

  @Post()
  public async addRoleToUser(@Body() dto: CreateUserRoleDto) {
    return this.userRolesService.create(dto);
  }

  @Get(':id')
  public async getRelationById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userRolesService.findRelationById(id);
  }
  @HttpCode(204)
  @Delete(':id')
  public async deleteRoleByUserId(@Param('id') id: string) {
    return this.userRolesService.delete(id);
  }
}

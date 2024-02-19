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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User-roles')
@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}
  @ApiOperation({ summary: 'Get All User-Roles with Query params' })
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
  @ApiOperation({ summary: 'Get User-Role relation by ID' })
  @Get(':id')
  public async getRelationById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userRolesService.findRelationById(id);
  }

  @ApiOperation({ summary: 'Create User-Role' })
  @Post()
  public async addRoleToUser(@Body() dto: CreateUserRoleDto) {
    return this.userRolesService.create(dto);
  }
  @ApiOperation({ summary: 'Delete Role by User ID' })
  @HttpCode(204)
  @Delete(':id')
  public async deleteRoleByUserId(@Param('id') id: string) {
    return this.userRolesService.delete(id);
  }
}

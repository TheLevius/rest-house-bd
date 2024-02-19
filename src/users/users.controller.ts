import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

const paramOptions = {
  name: 'id',
  description: 'User ID',
  example: '550e8400-e29b-41d4-a716-446655440000',
  format: 'uuid',
};

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Get All Users' })
  @Get()
  async getAll() {
    return this.usersService.findAll();
  }
  @ApiParam(paramOptions)
  @ApiOperation({ summary: 'Get One User by id (uuid)' })
  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneById(id);
  }
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
  })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
  @ApiBody({ type: UpdatePasswordDto })
  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam(paramOptions)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, dto);
  }
  @ApiBody({ type: UpdateLoginDto })
  @ApiParam(paramOptions)
  @ApiOperation({ summary: 'Change User Login' })
  @Patch(':id')
  async patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLoginDto,
  ) {
    return this.usersService.patchLogin(id, dto);
  }
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete User' })
  @ApiParam(paramOptions)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}

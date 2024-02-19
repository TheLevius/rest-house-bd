import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHash } from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/db/prisma.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from '@prisma/client';
import { UpdateLoginDto } from './dto/update-login.dto';
import {
  UserResponse,
  UserWithRolesResponse,
} from './interfaces/user.interface';

const select = {
  id: true,
  email: true,
  login: true,
};
const selectExt = {
  id: true,
  email: true,
  login: true,
  userRoles: {
    select: {
      id: true,
      role: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  },
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public findAll = async (): Promise<Array<UserWithRolesResponse>> => {
    const result = await this.prisma.user.findMany({
      select: selectExt,
    });
    return result;
  };

  public findOneById = async (id: string): Promise<UserResponse> => {
    try {
      const result = await this.prisma.user.findUniqueOrThrow({
        where: { id },
        select: selectExt,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
  };

  public create = async ({
    email,
    password,
  }: CreateUserDto): Promise<UserResponse> => {
    try {
      const result = await this.prisma.user.create({
        data: {
          email,
          password: this.hashPassword(password),
        },
        select,
      });
      return result;
    } catch (err) {
      throw new BadRequestException('email is already exists!');
    }
  };

  public updatePassword = async (
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<{ status: string; message: string; user: UserResponse }> => {
    let user: User;
    try {
      user = await this.prisma.user.findFirstOrThrow({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    if (this.hashPassword(dto.oldPassword) !== user?.password) {
      throw new ForbiddenException(`oldPassword is wrong`);
    }
    try {
      const result = await this.prisma.user.update({
        where: { id },
        data: {
          password: this.hashPassword(dto.newPassword),
        },
        select,
      });
      return {
        status: 'success',
        message: 'Password successfully updated',
        user: result,
      };
    } catch (err) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
  };

  public patchLogin = async (
    id: string,
    dto: UpdateLoginDto,
  ): Promise<{ status: string; message: string; user: UserResponse }> => {
    try {
      const result = await this.prisma.user.update({
        where: { id },
        data: { login: dto.login },
        select,
      });
      return {
        status: 'success',
        message: 'Login successfully patched',
        user: result,
      };
    } catch (err) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
  };

  public delete = async (id: string): Promise<UserResponse> => {
    try {
      const result = await this.prisma.user.delete({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
  };

  public hashPassword = (password: string): string =>
    createHash('sha256').update(password).digest('hex');
}

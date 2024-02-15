import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import {
  UserRoleExtResponse,
  UserRoleResponse,
} from './interfaces/user-roles.interface';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

const select = {
  userId: true,
  roleId: true,
  user: {
    select: {
      email: true,
      login: true,
    },
  },
  role: {
    select: {
      title: true,
    },
  },
};

@Injectable()
export class UserRolesService {
  constructor(private readonly prisma: PrismaService) {}
  public async findAll(): Promise<UserRoleResponse[]> {
    const result = await this.prisma.userRole.findMany({
      select,
    });
    return result;
  }
  public async findAllByUserId(id: string): Promise<UserRoleResponse[]> {
    const result = await this.prisma.userRole.findMany({
      where: { userId: id },
      select,
    });
    return result;
  }
  public async findAllByRole(title: string): Promise<UserRoleExtResponse[]> {
    const result = await this.prisma.userRole.findMany({
      where: {
        role: {
          title,
        },
      },
      select,
    });
    return result;
  }
  public async findRelationById(id: string): Promise<UserRoleResponse> {
    const result = await this.prisma.userRole.findUniqueOrThrow({
      where: { id },
    });
    return result;
  }
  public async create({
    userId,
    roleId,
  }: CreateUserRoleDto): Promise<UserRoleExtResponse> {
    const result = await this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
      select,
    });
    return result;
  }

  public async delete(id: string) {
    const result = await this.prisma.userRole.delete({
      where: { id },
    });
    return result;
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import {
  UserRoleExtResponse,
  WithRoleResponse,
  WithUserResponse,
} from './interfaces/user-roles.interface';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

const userSel = {
  id: true,
  email: true,
  login: true,
};
const roleSel = {
  id: true,
  title: true,
};

const select = {
  id: true,
  user: {
    select: userSel,
  },
  role: {
    select: roleSel,
  },
};
const selectRole = {
  role: {
    select: roleSel,
  },
};

const selectUser = {
  user: {
    select: userSel,
  },
};

@Injectable()
export class UserRolesService {
  constructor(private readonly prisma: PrismaService) {}
  public async findAll(): Promise<UserRoleExtResponse[]> {
    const result = await this.prisma.userRole.findMany({
      select,
    });
    return result;
  }
  public async findAllByUserId(id: string): Promise<WithRoleResponse[]> {
    try {
      const result = await this.prisma.userRole.findMany({
        where: { userId: id },
        select: selectRole,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`User Role with id: ${id} not found`);
    }
  }
  public async findAllByRole(title: string): Promise<WithUserResponse[]> {
    try {
      const result = await this.prisma.userRole.findMany({
        where: {
          role: {
            title,
          },
        },
        select: selectUser,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`User Role with title: ${title} not found`);
    }
  }
  public async findRelationById(id: string): Promise<UserRoleExtResponse> {
    try {
      const result = await this.prisma.userRole.findUniqueOrThrow({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(
        `User-Role Relation with title: ${id} not found`,
      );
    }
  }
  public async create({
    userId,
    roleId,
  }: CreateUserRoleDto): Promise<UserRoleExtResponse> {
    try {
      const result = await this.prisma.userRole.create({
        data: {
          userId,
          roleId,
        },
        select,
      });
      return result;
    } catch (err) {
      throw new InternalServerErrorException(
        'An unexpected error occurred on the server',
      );
    }
  }

  public async delete(id: string) {
    try {
      const result = await this.prisma.userRole.delete({
        where: { id },
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`User Role with id: ${id} not found`);
    }
  }
}

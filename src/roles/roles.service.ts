import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { RoleDto } from './dto/role.dto';
import { RoleResponse } from './interfaces/role.interface';

const select = { id: true, title: true };

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(title?: string): Promise<RoleResponse[]> {
    const result = await this.prisma.role.findMany({
      where: { title },
      select,
    });
    return result;
  }

  public async findOneById(id: number): Promise<RoleResponse> {
    try {
      const result = await this.prisma.role.findUniqueOrThrow({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Role with id: ${id} not found`);
    }
  }

  public async findOneByRole(title: string): Promise<RoleResponse> {
    try {
      const result = await this.prisma.role.findFirstOrThrow({
        where: { title },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Role ${title} not found`);
    }
  }

  public async create({ title }: RoleDto): Promise<RoleResponse> {
    try {
      const result = await this.prisma.role.create({
        data: { title },
        select,
      });
      return result;
    } catch (err) {
      throw new BadRequestException(`role ${title} is already exists!`);
    }
  }

  public async update(id: number, { title }: RoleDto): Promise<RoleResponse> {
    try {
      const result = await this.prisma.role.update({
        where: { id },
        data: { title },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`role with id ${id} not found`);
    }
  }

  public async delete(id: number): Promise<RoleResponse> {
    try {
      const result = await this.prisma.role.delete({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`role with id ${id} not found`);
    }
  }
}

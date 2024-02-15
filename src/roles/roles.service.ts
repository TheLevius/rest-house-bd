import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

const select = { id: true, title: true, createdAt: true, updatedAt: true };

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<Role[]> {
    const result = await this.prisma.role.findMany();
    return result;
  }

  public async findOneById(id: number): Promise<Role> {
    try {
      const result = await this.prisma.role.findUniqueOrThrow({
        select,
        where: { id },
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Role with id: ${id} not found`);
    }
  }

  public async findOneByRole(title: string): Promise<Role> {
    try {
      const result = await this.prisma.role.findFirstOrThrow({
        select,
        where: { title },
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Role ${title} not found`);
    }
  }

  public async create({ title }: CreateRoleDto): Promise<Role> {
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

  public async update(id: number, { title }: UpdateRoleDto): Promise<Role> {
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

  public async delete(id: number): Promise<Role> {
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

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateBuildingTypeDto } from './dto/create-building-type.dto';
import { UpdateBuildingTypeDto } from './dto/update-building-type.dto';
import { BuildingTypeResponse } from './interfaces/building-types.interface';

const select = {
  id: true,
  type: true,
};

@Injectable()
export class BuildingTypesService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<BuildingTypeResponse[]> {
    const result = await this.prisma.buildingType.findMany();
    return result;
  }

  public async getOneById(id: number): Promise<BuildingTypeResponse> {
    try {
      const result = await this.prisma.buildingType.findUniqueOrThrow({
        where: { id },
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Building Type with id: ${id} not found`);
    }
  }

  public async getOneByType(type: string): Promise<BuildingTypeResponse> {
    try {
      const result = await this.prisma.buildingType.findUniqueOrThrow({
        where: { type },
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Building Type ${type} not found`);
    }
  }

  public async create(
    dto: CreateBuildingTypeDto,
  ): Promise<BuildingTypeResponse> {
    try {
      const result = await this.prisma.buildingType.create({
        data: {
          id: dto.id,
          type: dto.type,
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

  public async update(
    id: number,
    dto: UpdateBuildingTypeDto,
  ): Promise<BuildingTypeResponse> {
    try {
      const result = await this.prisma.buildingType.update({
        where: {
          id,
        },
        data: dto,
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Building Type with id: ${id} not found`);
    }
  }

  public async delete(id: number): Promise<BuildingTypeResponse> {
    try {
      const result = await this.prisma.buildingType.delete({
        where: { id },
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Building Type with id: ${id} not found`);
    }
  }
}

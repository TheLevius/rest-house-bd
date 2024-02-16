import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateRoomDto } from './dto/create-rooms.dto';
import {
  QueryRoomDto,
  RoomDto,
  RoomExtResponse,
} from './interfaces/room.interface';
import { UpdateRoomDto } from './dto/update-rooms.dto';
import { QueryParamsRoomDto } from './dto/query-params-rooms.dto';

const select = {
  id: true,
  buildingTypeId: true,
  buildingType: {
    select: {
      type: true,
    },
  },
  number: true,
  roomCount: true,
  availability: true,
};

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}
  public async findAll(): Promise<RoomExtResponse[]> {
    const result = await this.prisma.room.findMany({
      select,
    });
    return result;
  }
  public async findAllByQueryParams(
    queryParamsDto: QueryParamsRoomDto,
  ): Promise<RoomExtResponse[]> {
    const searchParams = this.parseQueryParamsDtoToUpdateDto(queryParamsDto);
    const result = await this.prisma.room.findMany({
      where: searchParams,
      select,
    });
    return result;
  }
  public async findOneById(id: string): Promise<RoomExtResponse> {
    try {
      const result = await this.prisma.room.findUniqueOrThrow({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Room with id: ${id} Not found`);
    }
  }
  public async create(dto: CreateRoomDto): Promise<RoomExtResponse> {
    try {
      const result = await this.prisma.room.create({
        data: dto,
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
    id: string,
    dto: UpdateRoomDto,
  ): Promise<RoomExtResponse> {
    try {
      const result = await this.prisma.room.update({
        where: { id },
        data: dto,
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Room with id: ${id} Not found`);
    }
  }
  public async delete(id: string): Promise<RoomExtResponse> {
    try {
      const result = await this.prisma.room.delete({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Room with id: ${id} Not found`);
    }
  }
  private parseQueryParamsDtoToUpdateDto(
    queryParamsRoomDto: QueryRoomDto,
  ): RoomDto {
    return {
      buildingTypeId:
        queryParamsRoomDto?.buildingtypeid ?? queryParamsRoomDto.buildingtypeid,
      roomCount: queryParamsRoomDto?.roomcount ?? queryParamsRoomDto.roomcount,
      number: queryParamsRoomDto?.number ?? queryParamsRoomDto.number,
      availability:
        queryParamsRoomDto?.availability ?? queryParamsRoomDto.availability,
    };
  }
}

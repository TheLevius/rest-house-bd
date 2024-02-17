import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateRoomOccupiedPeriodDto,
  UpdateRoomOccupiedPeriodDto,
} from './dto/room-occupied-period.dto';
import {
  QueryParamsDto,
  RoomOccupiedPeriodResponse,
  RoomOccupiedPeriodWhereClause,
} from './interfaces/room-occupied-periods.interface';
import { Prisma } from '@prisma/client';

const select = {
  id: true,
  checkInDate: true,
  checkOutDate: true,
  room: {
    select: {
      id: true,
      roomCount: true,
      number: true,
      availability: true,
      buildingType: {
        select: {
          id: true,
          type: true,
        },
      },
    },
  },
};

@Injectable()
export class RoomOccupiedPeriodsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<RoomOccupiedPeriodResponse[]> {
    const result = await this.prisma.roomOccupiedPeriod.findMany({
      select,
    });
    return result;
  }

  public async findAllByQueryParams(
    qp: QueryParamsDto,
  ): Promise<RoomOccupiedPeriodResponse[]> {
    const whereClause = this.getWhereClauseByQueryParamsState(qp);
    try {
      const result = await this.prisma.roomOccupiedPeriod.findMany({
        where: whereClause,
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Room Occupied Period Not found`);
    }
  }

  public async findOneById(id: number): Promise<RoomOccupiedPeriodResponse> {
    try {
      const result = await this.prisma.roomOccupiedPeriod.findUniqueOrThrow({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(
        `Room Occupied Period with id: ${id} Not found`,
      );
    }
  }

  public async create(
    dto: CreateRoomOccupiedPeriodDto,
  ): Promise<RoomOccupiedPeriodResponse> {
    try {
      const result = await this.prisma.roomOccupiedPeriod.create({
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
    id: number,
    dto: UpdateRoomOccupiedPeriodDto,
  ): Promise<RoomOccupiedPeriodResponse> {
    try {
      const result = await this.prisma.roomOccupiedPeriod.update({
        where: { id },
        data: dto,
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(
        `Room Occupied Period with id: ${id} Not found`,
      );
    }
  }

  public async delete(id: number): Promise<RoomOccupiedPeriodResponse> {
    try {
      const result = await this.prisma.roomOccupiedPeriod.delete({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(
        `Room Occupied Period with id: ${id} Not found`,
      );
    }
  }
  private getWhereClauseByQueryParamsState(
    qp: QueryParamsDto,
  ): Prisma.RoomOccupiedPeriodWhereInput {
    const whereClause: RoomOccupiedPeriodWhereClause = {
      OR: [],
    };
    if (qp?.roomId) {
      whereClause.roomId = qp.roomId;
    }

    if (qp?.checkInDate && qp?.checkOutDate) {
      // cross-range by chkin
      whereClause.OR.push({
        checkInDate: {
          gte: qp.checkInDate,
          lte: qp.checkOutDate,
        },
      });
      // cross-range by chkout
      whereClause.OR.push({
        checkOutDate: {
          gte: qp.checkInDate,
          lte: qp.checkOutDate,
        },
      });
      // covering range
      whereClause.OR.push({
        checkInDate: { lte: qp.checkInDate },
        checkOutDate: { gte: qp.checkOutDate },
      });
    } else if (qp.checkInDate) {
      whereClause.OR.push({
        checkInDate: { gte: qp.checkInDate },
      });
    } else if (qp.checkOutDate) {
      whereClause.OR.push({
        checkOutDate: { lte: qp.checkOutDate },
      });
    }

    return whereClause;
  }
}

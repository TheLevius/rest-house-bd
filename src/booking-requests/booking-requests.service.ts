import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateBookingRequestDto } from './dto/create-booking-request.dto';
import { UpdateBookingRequestDto } from './dto/update-booking-request.dto';
import {
  BookingRequestResponse,
  BookingRequestWhereClause,
} from './inrerfaces/booking-requests.interface';
import { QueryBookingRequestDto } from './dto/query-params.dto';
import { Prisma } from '@prisma/client';

const buildingTypeSel = {
  select: {
    id: true,
    type: true,
  },
};
const userSel = {
  select: {
    id: true,
    email: true,
    login: true,
  },
};

const select = {
  id: true,
  phone: true,
  email: true,
  checkInDate: true,
  checkOutDate: true,
  adultsCount: true,
  childrenCount: true,
  childrenAges: true,
  message: true,
  user: userSel,
  buildingType: buildingTypeSel,
};

@Injectable()
export class BookingRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll({
    checkInDate,
    checkOutDate,
    ...queryParams
  }: QueryBookingRequestDto): Promise<BookingRequestResponse[]> {
    const wc = this.getWhereClauseByQueryParamsState({
      checkInDate,
      checkOutDate,
    });
    const where =
      wc.OR.length > 0 ? { ...queryParams, OR: wc.OR } : queryParams;
    const result = await this.prisma.bookingRequest.findMany({
      where,
      select,
    });
    return result;
  }

  public async findOneById(id: number): Promise<BookingRequestResponse> {
    try {
      const result = await this.prisma.bookingRequest.findUniqueOrThrow({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Booking Request with id: ${id} not found`);
    }
  }
  public async create(
    dto: CreateBookingRequestDto,
  ): Promise<BookingRequestResponse> {
    try {
      const result = await this.prisma.bookingRequest.create({
        data: dto,
        select,
      });
      return result;
    } catch (err) {
      throw new InternalServerErrorException(
        `An unexpected error occurred on the server`,
      );
    }
  }
  public async update(
    id: number,
    dto: UpdateBookingRequestDto,
  ): Promise<BookingRequestResponse> {
    try {
      const result = await this.prisma.bookingRequest.update({
        where: { id },
        data: dto,
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Booking Request with id: ${id} not found`);
    }
  }
  public async delete(id: number): Promise<BookingRequestResponse> {
    try {
      const result = await this.prisma.bookingRequest.delete({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Booking Request with id: ${id} not found`);
    }
  }

  private getWhereClauseByQueryParamsState(
    qp: QueryBookingRequestDto,
  ): Prisma.BookingRequestWhereInput {
    const whereClause: BookingRequestWhereClause = {
      OR: [],
    };

    if (qp?.checkInDate && qp?.checkOutDate) {
      // cross-range by check in [  {---]---
      whereClause.OR.push({
        checkInDate: {
          gte: qp.checkInDate,
          lte: qp.checkOutDate,
        },
      });
      // cross-range by check out ---[---}  ]
      whereClause.OR.push({
        checkOutDate: {
          gte: qp.checkInDate,
          lte: qp.checkOutDate,
        },
      });
      // covering range {---[------]---}
      whereClause.OR.push({
        checkInDate: { lte: qp.checkInDate },
        checkOutDate: { gte: qp.checkOutDate },
      });
    } else if (qp.checkInDate) {
      // [  {------}
      whereClause.OR.push({
        checkInDate: { gte: qp.checkInDate },
      });
    } else if (qp.checkOutDate) {
      // {------}   ]
      whereClause.OR.push({
        checkOutDate: { lte: qp.checkOutDate },
      });
    }

    return whereClause;
  }
}

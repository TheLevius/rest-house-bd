import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateBookingRequestDto } from './dto/create-booking-request.dto';
import { UpdateBookingRequestDto } from './dto/update-booking-request.dto';
import { BookingRequestResponse } from './inrerfaces/booking-requests.interface';
import { QueryBookingRequestDto } from './dto/query-params.dto';

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

  public async findAll(
    queryParams: QueryBookingRequestDto,
  ): Promise<BookingRequestResponse[]> {
    const result = await this.prisma.bookingRequest.findMany({
      where: queryParams,
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
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateBookingRequestDto } from './dto/create-booking-request.dto';
import { UpdateBookingRequestDto } from './dto/update-booking-request.dto';

@Injectable()
export class BookingRequestsService {
  constructor(private readonly prisma: PrismaService) {}
  public async findAll() {
    return this.prisma.bookingRequest.findMany({
      select: {},
    });
  }
  public async findOneById(id: number) {
    try {
      const result = await this.prisma.bookingRequest.findUniqueOrThrow({
        where: { id },
        select: {},
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Booking Request with id: ${id} not found`);
    }
  }
  public async create(dto: CreateBookingRequestDto) {
    try {
      const result = await this.prisma.bookingRequest.create({
        data: dto,
        select: {},
      });
      return result;
    } catch (err) {
      throw new InternalServerErrorException(``);
    }
  }
  public async update(id: number, dto: UpdateBookingRequestDto) {
    try {
      const result = await this.prisma.bookingRequest.update({
        where: { id },
        data: dto,
        select: {},
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Booking Request with id: ${id} not found`);
    }
  }
  public async delete(id: number) {
    try {
      const result = await this.prisma.bookingRequest.delete({
        where: { id },
        select: {},
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Booking Request with id: ${id} not found`);
    }
  }
}

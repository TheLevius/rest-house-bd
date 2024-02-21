import { BookingRequest, Prisma } from '@prisma/client';
import { ServiceDates } from 'src/interfaces/service-dates.interface';
import { BuildingTypeResponse } from 'src/building-types/interfaces/building-types.interface';
import { UserResponse } from 'src/users/interfaces/user.interface';
import { QueryBookingRequestDto } from '../dto/query-params.dto';

export type BookingRequestResponse = Omit<
  BookingRequest,
  ServiceDates | 'buildingTypeId' | 'userId'
> & {
  user: UserResponse;
  buildingType: BuildingTypeResponse;
};

export type CheckInOutDates = 'checkInDate' | 'checkOutDate';
export type BookingRequestWhereClause = Omit<
  QueryBookingRequestDto,
  CheckInOutDates
> & { OR: Prisma.BookingRequestWhereInput[] };

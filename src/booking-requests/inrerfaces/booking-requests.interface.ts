import { BookingRequest } from '@prisma/client';
import { ServiceDates } from 'src/interfaces/service-dates.interface';
import { BuildingTypeResponse } from 'src/building-types/interfaces/building-types.interface';
import { UserResponse } from 'src/users/interfaces/user.interface';

export type BookingRequestResponse = Omit<
  BookingRequest,
  ServiceDates | 'buildingTypeId' | 'userId'
> & {
  user: UserResponse;
  buildingType: BuildingTypeResponse;
};

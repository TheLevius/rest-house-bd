import { BuildingType, Prisma, Room, RoomOccupiedPeriod } from '@prisma/client';

export type RoomOccupiedPeriodResponse = Omit<
  RoomOccupiedPeriod,
  'roomId' | ServiceDates
> & {
  room: Omit<Room, 'buildingTypeId' | ServiceDates> & {
    buildingType: Omit<BuildingType, ServiceDates>;
  };
};
export type ServiceDates = 'createdAt' | 'updatedAt';

export type QueryParamsRaw = {
  roomid?: string;
  checkindate?: string;
  checkoutdate?: string;
};

export type QueryParamsDto = {
  roomId?: string;
  checkInDate?: string;
  checkOutDate?: string;
};

export type RoomOccupiedPeriodWhereClause = {
  roomId?: string;
  OR: Prisma.RoomOccupiedPeriodWhereInput[];
};

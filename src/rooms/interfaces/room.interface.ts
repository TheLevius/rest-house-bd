import { BuildingType, Room } from '@prisma/client';

export type RoomResponse = Omit<Room, 'createdAt' | 'updatedAt'>;
export type RoomExtResponse = RoomResponse & {
  buildingType: Pick<BuildingType, 'type'>;
};

export type QueryRoomDto = {
  buildingtypeid?: number;
  roomcount?: number;
  number?: number;
  availability?: string;
};

export type RoomDto = {
  buildingTypeId?: number;
  roomCount?: number;
  number?: number;
  availability?: string;
};

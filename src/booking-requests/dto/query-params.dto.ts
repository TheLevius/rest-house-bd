export class QueryBookingRequestDto {
  buildingTypeId?: number;
  userId?: string;
  phone?: string;
  email?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  adultsCount?: number;
  childrenCount?: number;
  message?: string;
}

export class QueryRawBookingRequestDto {
  buildingtypeid?: number;
  userid?: string;
  phone?: string;
  email?: string;
  checkindate?: Date;
  checkoutdate?: Date;
  adultscount?: number;
  childrencount?: number;
  message?: string;
}

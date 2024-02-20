import {
  IsEmail,
  IsISO8601,
  IsInt,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
export class QueryBookingRequestDto {
  @IsInt()
  buildingTypeId?: number;
  @IsUUID()
  userId?: string;
  @IsPhoneNumber()
  phone?: string;
  @IsEmail()
  email?: string;
  @IsISO8601()
  checkInDate?: Date;
  @IsISO8601()
  checkOutDate?: Date;
  @IsInt()
  adultsCount?: number;
  @IsInt()
  childrenCount?: number;
  @IsString()
  message?: string;
}

export class QueryRawBookingRequestDto {
  @IsInt()
  buildingtypeid?: number;

  @IsUUID()
  userid?: string;

  @IsPhoneNumber()
  phone?: string;

  @IsEmail()
  email?: string;

  @IsISO8601()
  checkindate?: Date;

  @IsISO8601()
  checkoutdate?: Date;

  @IsInt()
  adultscount?: number;

  @IsInt()
  childrencount?: number;

  @IsString()
  message?: string;
}

import {
  IsEmail,
  IsISO8601,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
export class QueryBookingRequestDto {
  @IsOptional()
  @IsInt()
  buildingTypeId?: number;
  @IsOptional()
  @IsUUID()
  userId?: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsISO8601()
  checkInDate?: string;
  @IsOptional()
  @IsISO8601()
  checkOutDate?: string;
  @IsOptional()
  @IsInt()
  adultsCount?: number;
  @IsOptional()
  @IsInt()
  childrenCount?: number;
  @IsOptional()
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
  checkindate?: string;

  @IsISO8601()
  checkoutdate?: string;

  @IsInt()
  adultscount?: number;

  @IsInt()
  childrencount?: number;

  @IsString()
  message?: string;
}

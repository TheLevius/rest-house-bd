import {
  IsInt,
  IsPositive,
  IsUUID,
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsISO8601,
  IsOptional,
  IsArray,
  Length,
} from 'class-validator';
export class CreateBookingRequestDto {
  @IsInt()
  @IsPositive()
  buildingTypeId: number;
  @IsUUID()
  userId: string;
  @IsPhoneNumber()
  phone: string;
  @IsEmail()
  email: string;
  @IsISO8601()
  checkInDate: string;
  @IsISO8601()
  checkOutDate: string;
  @IsInt()
  @IsPositive()
  adultsCount: number;
  @IsOptional()
  @IsInt()
  @IsPositive()
  childrenCount: number;
  @IsOptional()
  @IsArray()
  childrenAges: number[];
  @IsOptional()
  @IsString()
  @Length(1, 4096)
  message: string;
}

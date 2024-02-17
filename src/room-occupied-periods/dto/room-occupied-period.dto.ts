import { PartialType } from '@nestjs/mapped-types';
import { IsISO8601, IsOptional, IsUUID } from 'class-validator';

export class CreateRoomOccupiedPeriodDto {
  @IsUUID()
  roomId: string;
  @IsISO8601()
  checkInDate: string;
  @IsISO8601()
  checkOutDate: string;
}
export class UpdateRoomOccupiedPeriodDto extends PartialType(
  CreateRoomOccupiedPeriodDto,
) {}

export class QueryParamsRoomOccupiedPeriodDto {
  @IsOptional()
  @IsUUID()
  roomid?: string;
  @IsOptional()
  @IsISO8601()
  checkindate?: string;
  @IsOptional()
  @IsISO8601()
  checkoutdate?: string;
}

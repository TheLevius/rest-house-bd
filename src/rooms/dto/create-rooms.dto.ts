import { IsInt, IsPositive, IsString, Length, Max } from 'class-validator';
const maxInt = 2147483647; // max integer value
export class CreateRoomDto {
  @Max(maxInt)
  @IsPositive()
  @IsInt()
  buildingTypeId: number;
  @Max(maxInt)
  @IsPositive()
  @IsInt()
  number: number;
  @Max(maxInt)
  @IsPositive()
  @IsInt()
  roomCount: number;
  @Length(1, 127)
  @IsString()
  availability: string;
}

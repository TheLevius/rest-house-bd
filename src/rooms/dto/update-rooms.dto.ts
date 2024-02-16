import {
  IsInt,
  IsPositive,
  IsString,
  Length,
  Max,
  IsOptional,
} from 'class-validator';
const maxSMI = 32767; //smi (1 << 15) -1; 16bit int
export class UpdateRoomDto {
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  @IsOptional()
  buildingTypeId: number;
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  @IsOptional()
  number: number;
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  @IsOptional()
  roomCount: number;
  @Length(1, 127)
  @IsString()
  @IsOptional()
  availability: string;
}

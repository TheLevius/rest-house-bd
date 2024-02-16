import { IsInt, IsPositive, IsString, Length, Max } from 'class-validator';
const maxSMI = 32767; //smi
export class CreateRoomDto {
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  buildingTypeId: number;
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  number: number;
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  roomCount: number;
  @Length(1, 127)
  @IsString()
  availability: string;
}

import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
} from 'class-validator';
const maxSMI = 32767; //smi (1 << 15) -1; 16bit int

export class QueryParamsRoomDto {
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  @IsOptional()
  buildingtypeid: number;
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  @IsOptional()
  number: number;
  @Max(maxSMI)
  @IsPositive()
  @IsInt()
  @IsOptional()
  roomcount: number;
  @Length(1, 127)
  @IsString()
  @IsOptional()
  availability: string;
}

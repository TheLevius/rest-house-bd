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
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(maxSMI)
  buildingtypeid: number;
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(maxSMI)
  number: number;
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(maxSMI)
  roomcount: number;
  @IsOptional()
  @IsString()
  @Length(1, 127)
  availability: string;
}

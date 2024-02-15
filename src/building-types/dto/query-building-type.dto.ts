import { IsOptional, IsString, Length } from 'class-validator';

export class QueryBuildingTypeDto {
  @Length(1, 127)
  @IsString()
  @IsOptional()
  type: string;
}

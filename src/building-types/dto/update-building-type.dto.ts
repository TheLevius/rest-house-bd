import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateBuildingTypeDto {
  @IsInt()
  @IsOptional()
  id: number;
  @Length(1, 127)
  @IsString()
  @IsOptional()
  type: string;
}

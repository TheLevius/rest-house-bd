import { IsInt, IsString, Length } from 'class-validator';

export class CreateBuildingTypeDto {
  @IsInt()
  id: number;
  @Length(1, 127)
  @IsString()
  type: string;
}

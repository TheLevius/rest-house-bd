import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  title: string;
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;
  @IsString()
  content: string;
  @IsString()
  stayStart: string;
  @IsString()
  stayEnd: string;
  @IsString()
  guestName: string;
}

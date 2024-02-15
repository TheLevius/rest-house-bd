import { IsString, MaxLength } from 'class-validator';
export class UpdateLoginDto {
  @MaxLength(127)
  @IsString()
  login: string;
}

import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
export class CreateUserDto {
  @Length(5, 127)
  @IsEmail()
  email: string;
  @Length(8, 127)
  @IsString()
  password: string;
  @MaxLength(127)
  @IsString()
  login?: string;
}

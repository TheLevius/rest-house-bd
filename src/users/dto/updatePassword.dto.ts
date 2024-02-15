import { IsString, Length } from 'class-validator';
export class UpdatePasswordDto {
  @Length(8, 127)
  @IsString()
  oldPassword: string;
  @Length(8, 127)
  @IsString()
  newPassword: string;
}

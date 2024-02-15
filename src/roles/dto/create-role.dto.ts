import { IsString, Length } from 'class-validator';
export class CreateRoleDto {
  @Length(1, 127)
  @IsString()
  title: string;
}

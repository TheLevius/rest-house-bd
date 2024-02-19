import { IsString, Length } from 'class-validator';
export class RoleDto {
  @Length(1, 127)
  @IsString()
  title: string;
}

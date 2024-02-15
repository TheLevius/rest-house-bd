import { IsString, MaxLength } from 'class-validator';
export class UpdateRoleDto {
  @MaxLength(127)
  @IsString()
  title: string;
}

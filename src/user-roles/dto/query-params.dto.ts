import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UserRolesQueryDto {
  @IsString()
  @IsOptional()
  role: string;
  @IsUUID()
  @IsOptional()
  userid: string;
}

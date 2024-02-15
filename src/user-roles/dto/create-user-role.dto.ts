import { IsInt, IsUUID } from 'class-validator';

export class CreateUserRoleDto {
  @IsUUID()
  userId: string;
  @IsInt()
  roleId: number;
}

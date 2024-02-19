import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID } from 'class-validator';

export class CreateUserRoleDto {
  @IsUUID()
  @ApiProperty({
    description: 'User ID',
    format: 'uuid',
    minLength: 8,
    maxLength: 127,
    default: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;
  @IsInt()
  @ApiProperty({
    description: 'Role ID',
    format: 'int32',
    minLength: 8,
    maxLength: 127,
    default: '1',
  })
  roleId: number;
}

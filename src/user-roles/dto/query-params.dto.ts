import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UserRolesQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Role',
    default: 'User',
  })
  role: string;
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'User ID',
    required: false,
    default: '550e8400-e29b-41d4-a716-446655440000',
  })
  userid: string;
}

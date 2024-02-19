import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
export class UpdatePasswordDto {
  @Length(8, 127)
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Old password',
    minLength: 8,
    maxLength: 127,
    example: 'OldP@ssw0rd123',
  })
  oldPassword: string;
  @Length(8, 127)
  @IsString()
  @ApiProperty({
    type: String,
    description: 'New password',
    minLength: 8,
    maxLength: 127,
    example: 'NewP@ssw0rd123',
  })
  newPassword: string;
}

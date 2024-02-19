import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
export class CreateUserDto {
  @Length(5, 127)
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    format: 'email',
    minLength: 5,
    maxLength: 127,
  })
  email: string;

  @Length(8, 127)
  @IsString()
  @ApiProperty({
    description: 'User password',
    format: 'password',
    minLength: 8,
    maxLength: 127,
    default: 'CurrentP@ssw0rd123',
  })
  password: string;

  @MaxLength(127)
  @IsString()
  @ApiProperty({
    description: 'User login',
    maxLength: 127,
    required: false,
    default: 'ExampleLogin',
  })
  login?: string;
}

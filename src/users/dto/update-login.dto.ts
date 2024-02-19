import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
export class UpdateLoginDto {
  @IsString()
  @MaxLength(127)
  @ApiProperty({
    description: 'Patch login',
    maxLength: 127,
    minLength: 0,
    example: 'ExampleLogin',
    default: '',
  })
  login: string;
}

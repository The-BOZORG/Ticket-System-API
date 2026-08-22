import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'Registered email address',
  })
  @IsString()
  @IsEmail({}, { message: 'must be email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'pass1234',
    description: 'Account password',
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

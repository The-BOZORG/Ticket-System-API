import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'Username (max 96 chars)',
    maxLength: 96,
  })
  @IsString()
  @IsNotEmpty({ message: 'username required' })
  @MaxLength(96, { message: 'username must be less than 96 char' })
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address',
  })
  @IsString()
  @IsEmail({}, { message: 'must be email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'pass1234',
    description: 'Password (min 4 chars)',
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

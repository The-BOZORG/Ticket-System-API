import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'username required' })
  @MaxLength(96, { message: 'username must be less than 96 char' })
  username: string;

  @IsString()
  @IsEmail({}, { message: 'must be email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

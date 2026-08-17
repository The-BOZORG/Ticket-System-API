import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsEmail({}, { message: 'must be email' })
  @IsOptional()
  email?: string;
}

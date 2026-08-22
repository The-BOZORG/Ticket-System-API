import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @ApiPropertyOptional({ example: 'newname', description: 'New username' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: 'newemail@example.com',
    description: 'New email address',
  })
  @IsString()
  @IsEmail({}, { message: 'must be email' })
  @IsOptional()
  email?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldpass123', description: 'Current password' })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    example: 'newpass123',
    description: 'New password (min 4 chars)',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  newPassword: string;
}

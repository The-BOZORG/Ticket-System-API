import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCinemaDto {
  @ApiProperty({
    example: 'Cineplex Downtown',
    description: 'Cinema name (max 150 chars)',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: '123 Main St, New York, NY',
    description: 'Cinema address (max 255 chars)',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;
}

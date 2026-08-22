import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateShowtimeDto {
  @ApiProperty({ example: 1, description: 'Movie ID' })
  @IsInt()
  @IsNotEmpty()
  movieId: number;

  @ApiProperty({ example: 1, description: 'Hall ID' })
  @IsInt()
  @IsNotEmpty()
  hallId: number;

  @ApiProperty({
    example: '2026-06-01T18:00:00.000Z',
    description: 'Showtime start (ISO 8601)',
  })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    example: '2026-06-01T20:30:00.000Z',
    description: 'Showtime end (ISO 8601)',
  })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}

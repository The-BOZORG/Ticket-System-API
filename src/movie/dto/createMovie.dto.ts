import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { MovieGenre } from '../enum/movei.enum';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Inception',
    description: 'Movie title (max 150 chars)',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiProperty({
    example: 'A mind-bending thriller',
    description: 'Movie description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 148,
    description: 'Duration in minutes (min 1)',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'Poster URL (optional)',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  poster?: string;

  @ApiProperty({
    enum: MovieGenre,
    example: MovieGenre.SCI_FI,
    description: 'Movie genre',
  })
  @IsEnum(MovieGenre)
  genre: MovieGenre;

  @ApiProperty({
    example: 'en',
    description: 'Language (max 20 chars)',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  language: string;

  @ApiProperty({
    example: '2010-07-16',
    description: 'Release date (YYYY-MM-DD)',
  })
  @IsDateString()
  releaseDate: string;
}

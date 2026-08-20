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
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  poster?: string;

  @IsEnum(MovieGenre)
  genre: MovieGenre;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  language: string;

  @IsDateString()
  releaseDate: string;
}

import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  genre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  language: string;

  @IsDateString()
  releaseDate: string;
}

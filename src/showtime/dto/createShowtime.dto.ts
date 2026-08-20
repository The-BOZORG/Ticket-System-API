import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateShowtimeDto {
  @IsInt()
  @IsNotEmpty()
  movieId: number;

  @IsInt()
  @IsNotEmpty()
  hallId: number;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}

import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateReserveDto {
  @IsInt()
  showtimeId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  seatIds: number[];
}

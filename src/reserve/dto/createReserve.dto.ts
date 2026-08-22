import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateReserveDto {
  @ApiProperty({ example: 1, description: 'Showtime ID to reserve for' })
  @IsInt()
  showtimeId: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of seat IDs to reserve',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  seatIds: number[];
}

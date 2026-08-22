import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSeatDto {
  @ApiProperty({
    example: 'A',
    description: 'Seat row letter (max 10 chars)',
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  row: string;

  @ApiProperty({
    example: 5,
    description: 'Seat number within the row (1-100)',
    minimum: 1,
    maximum: 100,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  number: number;
}

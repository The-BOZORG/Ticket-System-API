import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSeatDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  row: string;

  @IsInt()
  @Min(1)
  @Max(100)
  number: number;
}

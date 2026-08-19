import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;
}

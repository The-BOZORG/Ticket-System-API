import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;
}

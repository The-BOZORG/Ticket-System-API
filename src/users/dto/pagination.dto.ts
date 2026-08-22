import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    example: 10,
    description: 'Number of results per page',
  })
  @IsPositive()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Number of results to skip',
    minimum: 0,
  })
  @IsOptional()
  @Min(0)
  offset?: number;
}

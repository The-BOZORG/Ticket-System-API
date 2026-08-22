import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty({ example: 'Support request', description: 'Ticket title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Need help with my reservation',
    description: 'Ticket description (optional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

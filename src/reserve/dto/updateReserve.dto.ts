import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ReserveStatus } from '../enum/reserve.enum';

export class UpdateReserveDto {
  @ApiProperty({
    enum: ReserveStatus,
    example: ReserveStatus.PAID,
    description: 'New reservation status',
  })
  @IsEnum(ReserveStatus)
  status: ReserveStatus;
}

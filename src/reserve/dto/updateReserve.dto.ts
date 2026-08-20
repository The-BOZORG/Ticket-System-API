import { IsEnum } from 'class-validator';
import { ReserveStatus } from '../enum/reserve.enum';

export class UpdateReserveDto {
  @IsEnum(ReserveStatus)
  status: ReserveStatus;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateShowtimeDto } from './createShowtime.dto';

export class UpdateShowtimeDto extends PartialType(CreateShowtimeDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateHallDto } from './createHall.dto';

export class UpdateHallDto extends PartialType(CreateHallDto) {}

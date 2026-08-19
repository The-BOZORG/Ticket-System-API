import { PartialType } from '@nestjs/mapped-types';
import { CreateCinemaDto } from './createCinema.dto';

export class UpdateCinemaDto extends PartialType(CreateCinemaDto) {}

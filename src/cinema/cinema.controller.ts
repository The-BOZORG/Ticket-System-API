import { Controller } from '@nestjs/common';
import { CinemaService } from './cinema.service';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}
}

import { Controller } from '@nestjs/common';
import { ScreeningService } from './screening.service';

@Controller('screening')
export class ScreeningController {
  constructor(private readonly screeningService: ScreeningService) {}
}

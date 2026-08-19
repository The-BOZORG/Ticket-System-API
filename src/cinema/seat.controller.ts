import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/createSeat.dto';
import { SeatEntity } from './entities/seat.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('seat')
@UseGuards(JwtAuthGuard)
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post('hall/:hallId')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Param('hallId') hallId: number,
    @Body() dto: CreateSeatDto,
  ): Promise<SeatEntity> {
    return await this.seatService.create(dto, hallId);
  }

  @Get('hall/:hallId')
  @HttpCode(HttpStatus.OK)
  public async getByHall(
    @Param('hallId') hallId: number,
  ): Promise<SeatEntity[]> {
    return await this.seatService.getSeat(hallId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Param('id') id: number): Promise<SeatEntity> {
    return await this.seatService.findById(id);
  }
}

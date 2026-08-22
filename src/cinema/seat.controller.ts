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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/createSeat.dto';
import { SeatEntity } from './entities/seat.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Seat')
@ApiBearerAuth('access-token')
@Controller('seat')
@UseGuards(JwtAuthGuard)
@Throttle({
  default: {
    limit: 30,
    ttl: 60000,
  },
})
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post('hall/:hallId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a seat in a hall' })
  @ApiParam({ name: 'hallId', description: 'Parent hall ID', example: 1 })
  public async create(
    @Param('hallId') hallId: number,
    @Body() dto: CreateSeatDto,
  ): Promise<SeatEntity> {
    return await this.seatService.create(dto, hallId);
  }

  @Get('hall/:hallId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all seats of a hall' })
  @ApiParam({ name: 'hallId', description: 'Hall ID', example: 1 })
  public async getByHall(
    @Param('hallId') hallId: number,
  ): Promise<SeatEntity[]> {
    return await this.seatService.getSeat(hallId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get seat by ID' })
  @ApiParam({ name: 'id', description: 'Seat ID', example: 1 })
  public async findById(@Param('id') id: number): Promise<SeatEntity> {
    return await this.seatService.findById(id);
  }
}

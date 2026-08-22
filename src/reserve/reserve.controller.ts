import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Request } from 'express';

import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/createReserve.dto';
import { ReserveEntity } from './entities/reserve.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Throttle } from '@nestjs/throttler';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

@ApiTags('Reserves')
@ApiBearerAuth('access-token')
@Controller('reserves')
@UseGuards(JwtAuthGuard)
@Throttle({
  default: {
    limit: 30,
    ttl: 60000,
  },
})
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a reservation',
    description: 'Reserves seats for a showtime. Runs in a transaction.',
  })
  public async create(
    @Body() dto: CreateReserveDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ReserveEntity> {
    return this.reserveService.create(dto, req.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get reservation by ID' })
  @ApiParam({ name: 'id', description: 'Reservation ID', example: 1 })
  public async findById(@Param('id') id: number): Promise<ReserveEntity> {
    return this.reserveService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a reservation' })
  @ApiParam({ name: 'id', description: 'Reservation ID', example: 1 })
  public async delete(@Param('id') id: number): Promise<void> {
    return this.reserveService.delete(id);
  }

  @Post('lock-seat')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Lock seats temporarily',
    description:
      'Acquires a 5-minute Redis lock on the given seats to prevent double-booking.',
  })
  public async lockSeats(@Body() dto: CreateReserveDto): Promise<void> {
    return this.reserveService.lockSeats(dto.showtimeId, dto.seatIds);
  }
}

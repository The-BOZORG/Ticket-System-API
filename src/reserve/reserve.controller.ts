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
  public async create(
    @Body() dto: CreateReserveDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ReserveEntity> {
    return this.reserveService.create(dto, req.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Param('id') id: number): Promise<ReserveEntity> {
    return this.reserveService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number): Promise<void> {
    return this.reserveService.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HallService } from './hall.service';
import { CreateHallDto } from './dto/createHall.dto';
import { HallEntity } from './entities/hall.entity';
import { UpdateHallDto } from './dto/updateHall.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('hall')
@UseGuards(JwtAuthGuard)
@Throttle({
  default: {
    limit: 30,
    ttl: 60000,
  },
})
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Post('create/:cinemaId')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Param('cinemaId') cinemaId: number,
    @Body() dto: CreateHallDto,
  ): Promise<HallEntity> {
    return this.hallService.create(dto, cinemaId);
  }

  @Get('cinema/:cinemaId')
  @HttpCode(HttpStatus.OK)
  public async getAll(
    @Param('cinemaId') cinemaId: number,
  ): Promise<HallEntity[]> {
    return this.hallService.getAll(cinemaId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Param('id') id: number): Promise<HallEntity> {
    return this.hallService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateHallDto,
  ): Promise<HallEntity> {
    return this.hallService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number): Promise<void> {
    return this.hallService.delete(id);
  }
}

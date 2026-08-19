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
import { CinemaService } from './cinema.service';
import { CinemaEntity } from './entities/cinema.entity';
import { UpdateCinemaDto } from './dto/updateCinema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateCinemaDto } from './dto/createCinema.dto';

@Controller('cinema')
@UseGuards(JwtAuthGuard)
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateCinemaDto): Promise<CinemaEntity> {
    return this.cinemaService.create(dto);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.OK)
  public async getAll(): Promise<CinemaEntity[]> {
    return this.cinemaService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findById(@Param('id') id: number): Promise<CinemaEntity> {
    return this.cinemaService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateCinemaDto,
  ): Promise<CinemaEntity> {
    return this.cinemaService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number): Promise<void> {
    return this.cinemaService.delete(id);
  }
}

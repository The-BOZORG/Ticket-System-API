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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

import { ShowtimeService } from './showtime.service';
import { ShowtimeEntity } from './entities/showtime.entity';
import { CreateShowtimeDto } from './dto/createShowtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Showtimes')
@ApiBearerAuth('access-token')
@Controller('showtimes')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a showtime' })
  public async create(@Body() dto: CreateShowtimeDto): Promise<ShowtimeEntity> {
    return this.showtimeService.create(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get showtime by ID' })
  @ApiParam({ name: 'id', description: 'Showtime ID', example: 1 })
  public async findById(@Param('id') id: number): Promise<ShowtimeEntity> {
    return this.showtimeService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a showtime' })
  @ApiParam({ name: 'id', description: 'Showtime ID', example: 1 })
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateShowtimeDto,
  ): Promise<ShowtimeEntity> {
    return this.showtimeService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a showtime' })
  @ApiParam({ name: 'id', description: 'Showtime ID', example: 1 })
  public async delete(@Param('id') id: number): Promise<void> {
    return this.showtimeService.delete(id);
  }
}

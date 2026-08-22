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
import { CinemaService } from './cinema.service';
import { CinemaEntity } from './entities/cinema.entity';
import { UpdateCinemaDto } from './dto/updateCinema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateCinemaDto } from './dto/createCinema.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Cinema')
@ApiBearerAuth('access-token')
@Controller('cinema')
@UseGuards(JwtAuthGuard)
@Throttle({
  default: {
    limit: 30,
    ttl: 60000,
  },
})
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new cinema' })
  public async create(@Body() dto: CreateCinemaDto): Promise<CinemaEntity> {
    return this.cinemaService.create(dto);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all cinemas' })
  public async getAll(): Promise<CinemaEntity[]> {
    return this.cinemaService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get cinema by ID' })
  @ApiParam({ name: 'id', description: 'Cinema ID', example: 1 })
  public async findById(@Param('id') id: number): Promise<CinemaEntity> {
    return this.cinemaService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a cinema' })
  @ApiParam({ name: 'id', description: 'Cinema ID', example: 1 })
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateCinemaDto,
  ): Promise<CinemaEntity> {
    return this.cinemaService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a cinema' })
  @ApiParam({ name: 'id', description: 'Cinema ID', example: 1 })
  public async delete(@Param('id') id: number): Promise<void> {
    return this.cinemaService.delete(id);
  }
}

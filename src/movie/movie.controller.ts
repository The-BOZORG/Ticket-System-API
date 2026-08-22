import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/createMovie.dto';
import { MovieEntity } from './entities/movie.entity';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('movies')
@UseGuards(JwtAuthGuard)
@Throttle({
  default: {
    limit: 30,
    ttl: 60000,
  },
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateMovieDto): Promise<MovieEntity> {
    return this.movieService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAllMovies(@Paginate() query: PaginateQuery) {
    return this.movieService.getAllMovies(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieEntity> {
    return this.movieService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.movieService.delete(id);
  }
}

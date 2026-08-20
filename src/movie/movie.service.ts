import { Injectable } from '@nestjs/common';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateMovieProvider } from './providers/createMovie.provider';
import { FindMovieByIdProvider } from './providers/findMoveById.provider';
import { GetAllMoviesPagination } from './providers/getAllMove.provider';
import { UpdateMovieProvider } from './providers/updateMovie.provider';
import { DeleteMovieProvider } from './providers/deleteMovie';
import { CreateMovieDto } from './dto/createMovie.dto';
import { MovieEntity } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly createMovieProvider: CreateMovieProvider,
    private readonly findMovieByIdProvider: FindMovieByIdProvider,
    private readonly getAllMoviesPagination: GetAllMoviesPagination,
    private readonly updateMovieProvider: UpdateMovieProvider,
    private readonly deleteMovieProvider: DeleteMovieProvider,
  ) {}

  public async create(dto: CreateMovieDto): Promise<MovieEntity> {
    return this.createMovieProvider.create(dto);
  }

  public async findById(id: number): Promise<MovieEntity> {
    return this.findMovieByIdProvider.findById(id);
  }

  public async getAllMovies(
    query: PaginateQuery,
  ): Promise<Paginated<MovieEntity>> {
    return this.getAllMoviesPagination.getAllMoviesPagination(query);
  }

  public async update(id: number, dto: UpdateMovieDto): Promise<MovieEntity> {
    return this.updateMovieProvider.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    return this.deleteMovieProvider.delete(id);
  }
}

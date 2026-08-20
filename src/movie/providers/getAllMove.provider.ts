import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovieEntity } from '../entities/movie.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class GetAllMoviesPagination {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  public async getAllMoviesPagination(
    query: PaginateQuery,
  ): Promise<Paginated<MovieEntity>> {
    try {
      return await paginate(query, this.movieRepository, {
        select: [
          'id',
          'title',
          'duration',
          'genre',
          'releaseDate',
          'createdAt',
        ],
        sortableColumns: [
          'id',
          'title',
          'duration',
          'releaseDate',
          'createdAt',
        ],
        searchableColumns: ['title', 'description'],
        defaultSortBy: [['createdAt', 'DESC']],
      });
    } catch (error) {
      throw new RequestTimeoutException('failed to find movie');
    }
  }
}

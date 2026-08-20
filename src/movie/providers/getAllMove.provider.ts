import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovieEntity } from '../entities/movie.entites';

@Injectable()
export class GetAllMoviesProvider {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  public async getAllMovies(
    limit = 10,
    page = 1,
  ): Promise<{
    data: MovieEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const [data, total] = await this.movieRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        data,
        total,
        page,
        limit,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find movie');
    }
  }
}

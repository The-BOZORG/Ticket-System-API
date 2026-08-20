import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovieEntity } from '../entities/movie.entites';

@Injectable()
export class FindMovieByIdProvider {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  public async findById(id: number): Promise<MovieEntity> {
    try {
      const movie = await this.movieRepository.findOneBy({ id });

      if (!movie) {
        throw new NotFoundException('movie not found');
      }

      return movie;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find movie');
    }
  }
}

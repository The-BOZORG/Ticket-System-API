import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovieEntity } from '../entities/movie.entites';
import { UpdateMovieDto } from '../dto/updateMovie.dto';

@Injectable()
export class UpdateMovieProvider {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  public async update(id: number, dto: UpdateMovieDto): Promise<MovieEntity> {
    try {
      await this.movieRepository.update(id, dto);

      return await this.movieRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find movie');
    }
  }
}

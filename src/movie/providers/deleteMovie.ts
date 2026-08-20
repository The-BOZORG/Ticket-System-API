import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entites';

@Injectable()
export class DeleteMovieProvider {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  public async delete(id: number): Promise<void> {
    try {
      const result = await this.movieRepository.delete(id);

      if (result.affected === 0) throw new NotFoundException('Movie not found');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find movie');
    }
  }
}

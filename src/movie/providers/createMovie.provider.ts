import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entites';
import { CreateMovieDto } from '../dto/createMovie.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CreateMovieProvider {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  public async create(dto: CreateMovieDto): Promise<MovieEntity> {
    try {
      const { title, description, duration, genre, releaseDate } = dto;

      const movie = this.movieRepository.create({
        title,
        description,
        duration,
        genre,
        releaseDate: new Date(releaseDate),
      });

      return await this.movieRepository.save(movie);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('database request failed');
    }
  }
}

import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowtimeEntity } from '../entities/showtime.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { HallEntity } from 'src/cinema/entities/hall.entity';
import { CreateShowtimeDto } from '../dto/createShowtime.dto';

@Injectable()
export class CreateShowtimeProvider {
  constructor(
    @InjectRepository(ShowtimeEntity)
    private readonly showtimeRepository: Repository<ShowtimeEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(HallEntity)
    private readonly hallRepository: Repository<HallEntity>,
  ) {}

  public async create(dto: CreateShowtimeDto): Promise<ShowtimeEntity> {
    const { movieId, hallId, startTime, endTime } = dto;

    try {
      const movie = await this.movieRepository.findOneBy({
        id: movieId,
      });

      if (!movie) throw new Error('movie not found');

      const hall = await this.hallRepository.findOneBy({
        id: hallId,
      });

      if (!hall) throw new Error('hall not found');

      const showtime = this.showtimeRepository.create({
        movie,
        hall,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });

      return await this.showtimeRepository.save(showtime);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to create showtime');
    }
  }
}

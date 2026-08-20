import {
  HttpException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowtimeEntity } from '../entities/showtime.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { HallEntity } from 'src/cinema/entities/hall.entity';
import { UpdateShowtimeDto } from '../dto/update-showtime.dto';

@Injectable()
export class UpdateShowtimeProvider {
  constructor(
    @InjectRepository(ShowtimeEntity)
    private readonly showtimeRepository: Repository<ShowtimeEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(HallEntity)
    private readonly hallRepository: Repository<HallEntity>,
  ) {}

  public async update(
    id: number,
    dto: UpdateShowtimeDto,
  ): Promise<ShowtimeEntity> {
    try {
      const showtime = await this.showtimeRepository.findOne({
        where: { id },
        relations: {
          movie: true,
          hall: true,
        },
      });

      if (!showtime) throw new NotFoundException('showtime not found');

      if (dto.movieId !== undefined) {
        const movie = await this.movieRepository.findOneBy({
          id: dto.movieId,
        });

        if (!movie) throw new NotFoundException('movie not found');

        showtime.movie = movie;
      }

      if (dto.hallId !== undefined) {
        const hall = await this.hallRepository.findOneBy({
          id: dto.hallId,
        });

        if (!hall) throw new NotFoundException('hall not found');

        showtime.hall = hall;
      }

      if (dto.startTime !== undefined) {
        showtime.startTime = new Date(dto.startTime);
      }

      if (dto.endTime !== undefined) {
        showtime.endTime = new Date(dto.endTime);
      }

      return await this.showtimeRepository.save(showtime);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to update showtime');
    }
  }
}

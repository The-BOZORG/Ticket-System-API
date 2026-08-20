import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShowtimeEntity } from '../entities/showtime.entity';

@Injectable()
export class FindShowtimeByIdProvider {
  constructor(
    @InjectRepository(ShowtimeEntity)
    private readonly showtimeRepository: Repository<ShowtimeEntity>,
  ) {}

  public async findById(id: number): Promise<ShowtimeEntity> {
    try {
      const showtime = await this.showtimeRepository.findOne({
        where: { id },
        relations: {
          movie: true,
          hall: true,
        },
      });

      if (!showtime) {
        throw new NotFoundException('Showtime not found');
      }

      return showtime;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find showtime');
    }
  }
}

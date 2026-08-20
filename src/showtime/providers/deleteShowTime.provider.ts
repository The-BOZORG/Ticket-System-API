import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShowtimeEntity } from '../entities/showtime.entity';

@Injectable()
export class DeleteShowtimeProvider {
  constructor(
    @InjectRepository(ShowtimeEntity)
    private readonly showtimeRepository: Repository<ShowtimeEntity>,
  ) {}

  public async delete(id: number): Promise<void> {
    try {
      const showtime = await this.showtimeRepository.findOneBy({
        id,
      });

      if (!showtime) throw new NotFoundException('showtime not found');

      await this.showtimeRepository.remove(showtime);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to delete showtime');
    }
  }
}

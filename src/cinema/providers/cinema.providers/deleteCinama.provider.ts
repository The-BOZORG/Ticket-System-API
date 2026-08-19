import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaEntity } from '../../entities/cinema.entity';
import { Repository } from 'typeorm';
import { FindCinemaByIdProvider } from './findCinemaById.provider';

@Injectable()
export class DeleteCinemaProvider {
  constructor(
    @InjectRepository(CinemaEntity)
    private readonly cinemaRepository: Repository<CinemaEntity>,

    private readonly findCinemaById: FindCinemaByIdProvider,
  ) {}

  public async delete(id: number): Promise<void> {
    try {
      const cinema = await this.findCinemaById.findById(id);

      await this.cinemaRepository.remove(cinema);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to delete cinema');
    }
  }
}

import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindCinemaByIdProvider } from './findCinemaById.provider';
import { UpdateCinemaDto } from '../../dto/updateCinema';
import { CinemaEntity } from 'src/cinema/entities/cinema.entity';

@Injectable()
export class UpdateCinemaProvider {
  constructor(
    @InjectRepository(CinemaEntity)
    private readonly cinemaRepository: Repository<CinemaEntity>,

    private readonly findCinemaById: FindCinemaByIdProvider,
  ) {}

  public async update(id: number, dto: UpdateCinemaDto): Promise<CinemaEntity> {
    try {
      const cinema = await this.findCinemaById.findById(id);

      Object.assign(cinema, dto);

      return await this.cinemaRepository.save(cinema);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to update cinema');
    }
  }
}

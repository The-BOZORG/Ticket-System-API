import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaEntity } from '../entities/cinema.entity';
import { Repository } from 'typeorm';
import { CreateCinemaDto } from '../dto/createCinema.dto';

@Injectable()
export class CreateCinemaProvider {
  constructor(
    @InjectRepository(CinemaEntity)
    private readonly cinemaRepository: Repository<CinemaEntity>,
  ) {}

  public async createCinema(dto: CreateCinemaDto): Promise<CinemaEntity> {
    const { name, address } = dto;

    try {
      const cinema = this.cinemaRepository.create({
        name,
        address,
      });

      return await this.cinemaRepository.save(cinema);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to delete cinema');
    }
  }
}

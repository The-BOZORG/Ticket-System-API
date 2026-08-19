import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaEntity } from '../entities/cinema.entity';
import { Repository } from 'typeorm';
import { CreateCinemaDto } from '../dto/createCinema.dto';

@Injectable()
export class GetAllCinemasProvider {
  constructor(
    @InjectRepository(CinemaEntity)
    private readonly cinemaRepository: Repository<CinemaEntity>,
  ) {}
  public async create(dto: CreateCinemaDto): Promise<CinemaEntity> {
    const { name, address } = dto;

    try {
      const cinema = this.cinemaRepository.create({
        name,
        address,
      });

      return await this.cinemaRepository.save(cinema);
    } catch (error) {
      throw new RequestTimeoutException('failed to create cinema', error);
    }
  }
}

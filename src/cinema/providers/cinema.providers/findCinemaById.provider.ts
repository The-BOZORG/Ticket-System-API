import {
  HttpException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaEntity } from '../../entities/cinema.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindCinemaByIdProvider {
  constructor(
    @InjectRepository(CinemaEntity)
    private readonly cinemaRepository: Repository<CinemaEntity>,
  ) {}

  public async findById(id: number): Promise<CinemaEntity> {
    try {
      const cinema = await this.cinemaRepository.findOne({
        where: {
          id,
        },
      });

      if (!cinema) throw new NotFoundException('Cinema not found');

      return cinema;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find cinema');
    }
  }
}

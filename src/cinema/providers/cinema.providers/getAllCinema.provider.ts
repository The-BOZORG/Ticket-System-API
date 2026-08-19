import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaEntity } from '../../entities/cinema.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllCinemasProvider {
  constructor(
    @InjectRepository(CinemaEntity)
    private readonly cinemaRepository: Repository<CinemaEntity>,
  ) {}

  public async getAll(): Promise<CinemaEntity[]> {
    try {
      return await this.cinemaRepository.find({
        order: {
          id: 'DESC',
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('Failed to find cinema');
    }
  }
}

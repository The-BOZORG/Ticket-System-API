import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HallEntity } from '../entities/hall.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllHallsProvider {
  constructor(
    @InjectRepository(HallEntity)
    private readonly hallRepository: Repository<HallEntity>,
  ) {}

  public async getAll(cinemaId: number): Promise<HallEntity[]> {
    try {
      return await this.hallRepository.find({
        where: {
          cinema: {
            id: cinemaId,
          },
        },
        order: {
          id: 'DESC',
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('failed to get halls');
    }
  }
}

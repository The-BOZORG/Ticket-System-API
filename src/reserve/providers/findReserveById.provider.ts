import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReserveEntity } from '../entities/reserve.entity';

@Injectable()
export class FindReserveByIdProvider {
  constructor(
    @InjectRepository(ReserveEntity)
    private readonly reserveRepository: Repository<ReserveEntity>,
  ) {}

  public async findById(id: number): Promise<ReserveEntity> {
    try {
      const reserve = await this.reserveRepository.findOne({
        where: { id },
        relations: {
          user: true,
          showtime: {
            movie: true,
            hall: true,
          },
          reserveSeats: {
            seat: true,
          },
        },
      });

      if (!reserve) throw new NotFoundException('reserve not found');

      return reserve;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find reserve');
    }
  }
}

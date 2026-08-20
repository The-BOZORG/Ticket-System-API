import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReserveEntity } from '../entities/reserve.entity';

@Injectable()
export class DeleteReserveProvider {
  constructor(
    @InjectRepository(ReserveEntity)
    private readonly reserveRepository: Repository<ReserveEntity>,
  ) {}

  public async delete(id: number): Promise<void> {
    try {
      const reserve = await this.reserveRepository.findOneBy({
        id,
      });

      if (!reserve) throw new NotFoundException('reserve not found');

      await this.reserveRepository.remove(reserve);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to delete reserve');
    }
  }
}

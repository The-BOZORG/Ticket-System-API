import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HallEntity } from '../../entities/hall.entity';
import { FindHallByIdProvider } from './findHallById';

@Injectable()
export class DeleteHallProvider {
  constructor(
    @InjectRepository(HallEntity)
    private readonly cinemaRepository: Repository<HallEntity>,

    private readonly findHallById: FindHallByIdProvider,
  ) {}

  public async delete(id: number): Promise<void> {
    try {
      const hall = await this.findHallById.findById(id);

      await this.cinemaRepository.remove(hall);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to delete cinema');
    }
  }
}

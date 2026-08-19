import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HallEntity } from '../entities/hall.entity';
import { FindHallByIdProvider } from './findHallById';
import { UpdateHallDto } from '../dto/updateHall.dto';

@Injectable()
export class UpdateHallProvider {
  constructor(
    @InjectRepository(HallEntity)
    private readonly hallRepository: Repository<HallEntity>,

    private readonly findHallById: FindHallByIdProvider,
  ) {}

  public async update(id: number, dto: UpdateHallDto): Promise<HallEntity> {
    try {
      const hall = await this.findHallById.findById(id);

      Object.assign(hall, dto);

      return await this.hallRepository.save(hall);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to update cinema');
    }
  }
}

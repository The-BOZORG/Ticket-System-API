import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HallEntity } from '../entities/hall.entity';
import { Repository } from 'typeorm';
import { FindCinemaByIdProvider } from './findCinemaById.provider';
import { CreateHallDto } from '../dto/createHall.dto';

@Injectable()
export class CreateHallProvider {
  constructor(
    @InjectRepository(HallEntity)
    private readonly hallRepository: Repository<HallEntity>,

    private readonly findCinemaById: FindCinemaByIdProvider,
  ) {}

  public async create(
    dto: CreateHallDto,
    cinemaId: number,
  ): Promise<HallEntity> {
    try {
      const cinema = await this.findCinemaById.findById(cinemaId);

      const hall = this.hallRepository.create({
        name: dto.name,
        cinema,
      });

      return await this.hallRepository.save(hall);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to create hall');
    }
  }
}

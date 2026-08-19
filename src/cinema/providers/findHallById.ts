import {
  HttpException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HallEntity } from '../entities/hall.entity';

@Injectable()
export class FindHallByIdProvider {
  constructor(
    @InjectRepository(HallEntity)
    private readonly hallRepository: Repository<HallEntity>,
  ) {}

  public async findById(id: number): Promise<HallEntity> {
    try {
      const hall = await this.hallRepository.findOne({
        where: { id },
        relations: {
          cinema: true,
        },
      });

      if (!hall) {
        throw new NotFoundException('Hall not found');
      }

      return hall;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find hall');
    }
  }
}

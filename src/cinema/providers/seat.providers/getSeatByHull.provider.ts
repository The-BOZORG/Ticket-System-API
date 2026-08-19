import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatEntity } from 'src/cinema/entities/seat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetSeatsByHallProvider {
  constructor(
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
  ) {}

  public async getByHall(hallId: number): Promise<SeatEntity[]> {
    try {
      return await this.seatRepository.find({
        where: {
          hall: {
            id: hallId,
          },
        },
        order: {
          row: 'ASC',
          number: 'ASC',
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('failed to get seats', error);
    }
  }
}

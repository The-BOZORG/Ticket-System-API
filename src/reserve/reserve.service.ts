import { Injectable } from '@nestjs/common';

import { CreateReserveDto } from './dto/createReserve.dto';
import { ReserveEntity } from './entities/reserve.entity';
import { CreateReserveProvider } from './providers/createReserve.provider';
import { FindReserveByIdProvider } from './providers/findReserveById.provider';
import { DeleteReserveProvider } from './providers/deleteReserver.provider';
import { SeatLockProvider } from './providers/seatLock.provider';

@Injectable()
export class ReserveService {
  constructor(
    private readonly createReserveProvider: CreateReserveProvider,

    private readonly findReserveByIdProvider: FindReserveByIdProvider,

    private readonly deleteReserveProvider: DeleteReserveProvider,

    private readonly seatLockProvider: SeatLockProvider,
  ) {}

  public async create(
    dto: CreateReserveDto,
    userId: string,
  ): Promise<ReserveEntity> {
    return this.createReserveProvider.create(dto, userId);
  }

  public async findById(id: number): Promise<ReserveEntity> {
    return this.findReserveByIdProvider.findById(id);
  }

  public async delete(id: number): Promise<void> {
    return this.deleteReserveProvider.delete(id);
  }

  public async lockSeats(showtimeId: number, seatIds: number[]): Promise<void> {
    await Promise.all(
      seatIds.map((seatId) => this.seatLockProvider.lock(showtimeId, seatId)),
    );
  }
}

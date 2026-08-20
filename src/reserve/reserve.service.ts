import { Injectable } from '@nestjs/common';

import { CreateReserveDto } from './dto/createReserve.dto';
import { ReserveEntity } from './entities/reserve.entity';
import { CreateReserveProvider } from './providers/createReserve.provider';
import { FindReserveByIdProvider } from './providers/findReserveById.provider';
import { DeleteReserveProvider } from './providers/deleteReserver.provider';

@Injectable()
export class ReserveService {
  constructor(
    private readonly createReserveProvider: CreateReserveProvider,

    private readonly findReserveByIdProvider: FindReserveByIdProvider,

    private readonly deleteReserveProvider: DeleteReserveProvider,
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
}

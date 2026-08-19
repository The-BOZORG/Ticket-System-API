import { Injectable } from '@nestjs/common';
import { CreateCinemaProvider } from './providers/createCinema.providers';
import { GetAllCinemasProvider } from './providers/getAllCinema.provider';
import { FindCinemaByIdProvider } from './providers/findCinemaById.provider';
import { UpdateCinemaProvider } from './providers/updateCinema.provider';
import { DeleteCinemaProvider } from './providers/deleteCinama.provider';
import { CinemaEntity } from './entities/cinema.entity';
import { CreateCinemaDto } from './dto/createCinema.dto';
import { UpdateCinemaDto } from './dto/updateCinema';

@Injectable()
export class CinemaService {
  constructor(
    private readonly createCinemaProvider: CreateCinemaProvider,
    private readonly getAllCinemasProvider: GetAllCinemasProvider,
    private readonly findCinemaByIdProvider: FindCinemaByIdProvider,
    private readonly updateCinemaProvider: UpdateCinemaProvider,
    private readonly deleteCinemaProvider: DeleteCinemaProvider,
  ) {}

  public async create(dto: CreateCinemaDto): Promise<CinemaEntity> {
    return this.createCinemaProvider.createCinema(dto);
  }

  public async getAll(): Promise<CinemaEntity[]> {
    return this.getAllCinemasProvider.getAll();
  }

  public async findById(id: number): Promise<CinemaEntity> {
    return this.findCinemaByIdProvider.findById(id);
  }

  public async update(id: number, dto: UpdateCinemaDto): Promise<CinemaEntity> {
    return this.updateCinemaProvider.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    return this.deleteCinemaProvider.delete(id);
  }
}

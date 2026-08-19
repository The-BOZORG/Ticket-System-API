import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaEntity } from './entities/cinema.entity';
import { HallEntity } from './entities/hall.entity';
import { SeatEntity } from './entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CinemaEntity, HallEntity, SeatEntity])],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}

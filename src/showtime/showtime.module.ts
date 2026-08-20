import { Module } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';
import { CreateShowtimeProvider } from './providers/createShowtime.provider';
import { FindShowtimeByIdProvider } from './providers/findShowtimeById.provider';
import { UpdateShowtimeProvider } from './providers/updateShowtime.provider';
import { DeleteShowtimeProvider } from './providers/deleteShowTime.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowtimeEntity } from './entities/showtime.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { HallEntity } from 'src/cinema/entities/hall.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShowtimeEntity, MovieEntity, HallEntity]),
  ],
  controllers: [ShowtimeController],
  providers: [
    ShowtimeService,
    CreateShowtimeProvider,
    FindShowtimeByIdProvider,
    UpdateShowtimeProvider,
    DeleteShowtimeProvider,
  ],
})
export class ShowtimeModule {}

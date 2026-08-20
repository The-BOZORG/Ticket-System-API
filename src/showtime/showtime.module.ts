import { Module } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';
import { CreateShowtimeProvider } from './providers/createShowtime.provider';
import { FindShowtimeByIdProvider } from './providers/findShowtimeById.provider';
import { UpdateShowtimeProvider } from './providers/updateShowtime.provider';
import { DeleteShowtimeProvider } from './providers/deleteShowTime.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowtimeEntity } from './entities/showtime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShowtimeEntity])],
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

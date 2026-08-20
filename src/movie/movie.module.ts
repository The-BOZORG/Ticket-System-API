import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entites';
import { CreateMovieProvider } from './providers/createMovie.provider';
import { FindMovieByIdProvider } from './providers/findMoveById.provider';
import { GetAllMoviesPagination } from './providers/getAllMove.provider';
import { UpdateMovieProvider } from './providers/updateMovie.provider';
import { DeleteMovieProvider } from './providers/deleteMovie';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [
    MovieService,
    CreateMovieProvider,
    FindMovieByIdProvider,
    GetAllMoviesPagination,
    UpdateMovieProvider,
    DeleteMovieProvider,
  ],
})
export class MovieModule {}

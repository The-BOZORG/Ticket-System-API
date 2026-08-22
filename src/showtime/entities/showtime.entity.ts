import { ApiProperty } from '@nestjs/swagger';
import { ReserveEntity } from '../../reserve/entities/reserve.entity';
import { HallEntity } from '../../cinema/entities/hall.entity';
import { MovieEntity } from '../../movie/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'showtimes' })
export class ShowtimeEntity {
  @ApiProperty({ example: 1, description: 'Showtime ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => MovieEntity, description: 'Movie being shown' })
  @ManyToOne(() => MovieEntity, (movie) => movie.showtimes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @ApiProperty({ type: () => HallEntity, description: 'Hall where shown' })
  @ManyToOne(() => HallEntity, (hall) => hall.showtimes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hall_id' })
  hall: HallEntity;

  @ApiProperty({
    example: '2026-06-01T18:00:00.000Z',
    description: 'Showtime start',
  })
  @Column({ type: 'timestamp' })
  startTime: Date;

  @ApiProperty({
    example: '2026-06-01T20:30:00.000Z',
    description: 'Showtime end',
  })
  @Column({ type: 'timestamp' })
  endTime: Date;

  @ApiProperty({
    type: () => [ReserveEntity],
    description: 'Reservations for this showtime',
  })
  @OneToMany(() => ReserveEntity, (reserve) => reserve.showtime)
  reserves: ReserveEntity[];

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}

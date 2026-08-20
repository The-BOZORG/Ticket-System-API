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
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MovieEntity, (movie) => movie.showtimes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @ManyToOne(() => HallEntity, (hall) => hall.showtimes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hall_id' })
  hall: HallEntity;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @OneToMany(() => ReserveEntity, (reserve) => reserve.showtime)
  reserves: ReserveEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

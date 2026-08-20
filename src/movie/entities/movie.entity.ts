import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieGenre } from '../enum/movei.enum';
import { ShowtimeEntity } from '../../showtime/entities/showtime.entity';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  duration: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  genre: MovieGenre;

  @Column({
    type: 'date',
    nullable: false,
  })
  releaseDate: Date;

  @OneToMany(() => ShowtimeEntity, (showtime) => showtime.movie)
  showtimes: ShowtimeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

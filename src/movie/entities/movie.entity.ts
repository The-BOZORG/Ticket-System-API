import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1, description: 'Movie ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Inception', description: 'Movie title' })
  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    example: 'A mind-bending thriller...',
    description: 'Movie description',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @ApiProperty({ example: 148, description: 'Duration in minutes' })
  @Column({
    type: 'int',
    nullable: false,
  })
  duration: number;

  @ApiProperty({
    enum: MovieGenre,
    example: MovieGenre.SCI_FI,
    description: 'Movie genre',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  genre: MovieGenre;

  @ApiProperty({
    example: '2010-07-16',
    description: 'Release date (YYYY-MM-DD)',
  })
  @Column({
    type: 'date',
    nullable: false,
  })
  releaseDate: Date;

  @ApiProperty({
    type: () => [ShowtimeEntity],
    description: 'Showtimes for this movie',
  })
  @OneToMany(() => ShowtimeEntity, (showtime) => showtime.movie)
  showtimes: ShowtimeEntity[];

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}

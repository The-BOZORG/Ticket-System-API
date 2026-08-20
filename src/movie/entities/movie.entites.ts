import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieGenre } from '../enum/movei.enum';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

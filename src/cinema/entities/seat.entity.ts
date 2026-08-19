import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { HallEntity } from './hall.entity';

@Entity({ name: 'seats' })
@Unique(['hall', 'row', 'number'])
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  row: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  number: number;

  @ManyToOne(() => HallEntity, (hall) => hall.seats, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  hall: HallEntity;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HallEntity } from './hall.entity';

@Entity({ name: 'seats' })
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 10,
  })
  row: string;

  @Column({
    type: 'int',
  })
  number: number;

  @ManyToOne(() => HallEntity, (hall) => hall.seats, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  hall: HallEntity;
}

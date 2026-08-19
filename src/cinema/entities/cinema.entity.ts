import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HallEntity } from './hall.entity';

@Entity({ name: 'cinemas' })
export class CinemaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @OneToMany(() => HallEntity, (hall) => hall.cinema)
  halls: HallEntity[];
}

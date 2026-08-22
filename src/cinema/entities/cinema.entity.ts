import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HallEntity } from './hall.entity';

@Entity({ name: 'cinemas' })
export class CinemaEntity {
  @ApiProperty({ example: 1, description: 'Cinema ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Cineplex Downtown', description: 'Cinema name' })
  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @ApiProperty({
    example: '123 Main St, New York, NY',
    description: 'Cinema address',
  })
  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @ApiProperty({
    type: () => [HallEntity],
    description: 'Halls in this cinema',
  })
  @OneToMany(() => HallEntity, (hall) => hall.cinema)
  halls: HallEntity[];
}

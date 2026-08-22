import { Exclude } from 'class-transformer';
import { TicketEntity } from '../../ticket/entities/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReserveEntity } from '../../reserve/entities/reserve.entity';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'User UUID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'johndoe', description: 'Unique username' })
  @Column({
    type: 'varchar',
    length: 96,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Unique email address',
  })
  @Column({
    type: 'varchar',
    length: 96,
    unique: true,
  })
  email: string;

  @ApiHideProperty()
  @Column({
    type: 'varchar',
  })
  @Exclude()
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'User role',
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ example: false, description: 'Whether email is verified' })
  @Column({
    type: 'boolean',
    default: false,
  })
  isVerified: boolean;

  @ApiHideProperty()
  @OneToMany(() => TicketEntity, (ticket) => ticket.user)
  tickets: TicketEntity[];

  @ApiHideProperty()
  @OneToMany(() => ReserveEntity, (reserve) => reserve.user)
  reserves: ReserveEntity[];

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Account creation date',
  })
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Last update date',
  })
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

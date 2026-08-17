import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateDto } from '../dto/update.dto';
import { FindUserById } from './findUserById.provider';

@Injectable()
export class UpdateUser {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly findById: FindUserById,
  ) {}

  public async updateUser(dto: UpdateDto, userId: string): Promise<UserEntity> {
    const user = await this.findById.findById(userId);

    Object.assign(user, dto);

    return this.userRepository.save(user);
  }
}

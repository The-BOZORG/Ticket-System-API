import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class GetUsers {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getAllUser(dto: PaginationDto): Promise<{
    data: UserEntity[];
    count: number;
  }> {
    const { limit = 10, offset = 0 } = dto;

    const [users, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      data: users,
      count: total,
    };
  }
}

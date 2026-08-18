import { Paginated, PaginateQuery, paginate } from 'nestjs-paginate';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllUsersPagination {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsersPagination(
    query: PaginateQuery,
  ): Promise<Paginated<UserEntity>> {
    return paginate(query, this.userRepository, {
      select: ['id', 'email', 'username', 'role'],
      sortableColumns: ['id', 'createdAt'],
      searchableColumns: ['email', 'username'],
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }
}

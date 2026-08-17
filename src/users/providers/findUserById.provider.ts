import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserById {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  public async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userEntity.findOneBy({ id });

      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new RequestTimeoutException('Database request failed');
    }
  }
}

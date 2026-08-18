import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByEmailProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findByEmail(email: string): Promise<UserEntity> {
    let user: UserEntity | null = null;

    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException('Database request failed', error);
    }

    if (!user) {
      throw new NotFoundException('user does not exist.');
    }

    return user;
  }
}

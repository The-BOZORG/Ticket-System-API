import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserById } from './findUserById.provider';

@Injectable()
export class DeleteUser {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly findById: FindUserById,
  ) {}

  public async deleteUser(userId: string): Promise<void> {
    try {
      const user = await this.findById.findById(userId);

      await this.userRepository.delete({
        id: user.id,
      });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new RequestTimeoutException('database request failed');
    }
  }
}

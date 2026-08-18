import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserById } from './findUserById.provider';
import { HashProvider } from 'src/auth/providers/hash.provider';
import { ChangePasswordDto } from '../dto/updatePassword.dto';

@Injectable()
export class UpdatePassword {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly findById: FindUserById,
    private readonly hashProvider: HashProvider,
  ) {}

  public async updatePassword(
    userId: string,
    dto: ChangePasswordDto,
  ): Promise<void> {
    try {
      const user = await this.findById.findById(userId);

      const isPasswordValid = await this.hashProvider.compare(
        dto.currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('current password is incorrect');
      }

      user.password = await this.hashProvider.hash(dto.newPassword);

      await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new RequestTimeoutException('database request failed');
    }
  }
}

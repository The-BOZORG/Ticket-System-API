import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtPayload } from '../interface/jwt.interface';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ValidateRefreshJwtProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    let user: UserEntity | null;

    try {
      user = await this.userRepository.findOneBy({
        id: payload.id,
      });
    } catch {
      throw new RequestTimeoutException('Database request failed.');
    }

    if (!user) throw new UnauthorizedException('Invalid refresh token.');

    return user;
  }
}

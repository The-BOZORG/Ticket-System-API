import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interface/jwt.interface';

@Injectable()
export class ValidateJwtProvider {
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
    } catch (error) {
      throw new RequestTimeoutException('database request failed');
    }

    if (!user) throw new UnauthorizedException('invalid token');

    return user;
  }
}

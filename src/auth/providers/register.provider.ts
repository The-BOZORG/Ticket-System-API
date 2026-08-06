import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashProvider } from './hash.provider';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class RegisterProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly hashProvider: HashProvider,
  ) {}

  public async register(dto: RegisterDto): Promise<UserEntity> {
    const existUser = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existUser) throw new ConflictException('user already exists.');

    const hashPassword = await this.hashProvider.hash(dto.password);

    const user = this.userRepository.create({
      ...dto,
      password: hashPassword,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new RequestTimeoutException('could not save user.');
    }
  }
}

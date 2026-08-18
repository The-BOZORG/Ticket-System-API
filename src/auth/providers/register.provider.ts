import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashProvider } from './hash.provider';
import { RegisterDto } from '../dto/register.dto';
import { WhiteListProvider } from './whiteList.provider';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class RegisterProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly hashProvider: HashProvider,

    private readonly whiteListProvider: WhiteListProvider,

    private readonly mailService: MailService,
  ) {}

  public async register(dto: RegisterDto): Promise<UserEntity> {
    const existUser = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    const role = this.whiteListProvider.isAdmin(dto.email)
      ? UserRole.ADMIN
      : UserRole.USER;

    if (existUser) throw new ConflictException('user already exists.');

    const hashPassword = await this.hashProvider.hash(dto.password);

    const user = this.userRepository.create({
      ...dto,
      password: hashPassword,
      role,
    });

    try {
      const savedUser = await this.userRepository.save(user);

      await this.mailService.sendUserWelcome(savedUser);

      return savedUser;
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('could not save user.');
    }
  }
}

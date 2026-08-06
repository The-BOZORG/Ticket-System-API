import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashProvider } from './hash.provider';
import { FindUserByEmailProvider } from 'src/users/providers/findUserByEmail.provider';
import { LoginDto } from '../dto/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ValidateLocalProvider {
  constructor(
    private readonly hashProvider: HashProvider,
    private readonly findUserByEmail: FindUserByEmailProvider,
  ) {}

  public async validate(dto: LoginDto): Promise<UserEntity> {
    const user = await this.findUserByEmail.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('email not exist');

    const passwordMath = await this.hashProvider.compare(
      dto.password,
      user.password,
    );

    if (!passwordMath) throw new UnauthorizedException('wrong password');

    return user;
  }
}

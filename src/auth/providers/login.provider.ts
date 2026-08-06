import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { GenerateTokenProvider } from './generateToken.provider';
import { GeneratedTokens } from '../interface/token.interface';

@Injectable()
export class LoginProvider {
  constructor(private readonly generateTokenProvider: GenerateTokenProvider) {}

  public async login(user: UserEntity): Promise<GeneratedTokens> {
    return this.generateTokenProvider.generateTokens({
      id: user.id,
    });
  }
}

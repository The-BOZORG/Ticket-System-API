import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { CookieProvider } from './cookie.provider';
import { GenerateTokenProvider } from './generateToken.provider';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    private readonly generateTokenProvider: GenerateTokenProvider,
    private readonly cookieProvider: CookieProvider,
  ) {}

  public async refreshToken(
    user: UserEntity,
    response: Response,
  ): Promise<{ accessToken: string }> {
    const tokens = await this.generateTokenProvider.generateTokens({
      id: user.id,
    });

    this.cookieProvider.setRefreshTokenCookie(response, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
    };
  }
}

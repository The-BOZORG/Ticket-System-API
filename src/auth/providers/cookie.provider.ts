import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import type ms from 'ms';

@Injectable()
export class CookieProvider {
  public setRefreshTokenCookie(response: Response, refreshToken: string): void {
    response.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ms(this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL')),
    });
  }

  public clearRefreshTokenCookie(response: Response) {
    response.clearCookie('RefreshToken');
  }
}

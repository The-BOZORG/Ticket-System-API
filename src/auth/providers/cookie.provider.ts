import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieProvider {
  public setRefreshTokenCookie(response: Response, refreshToken: string): void {
    response.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  public clearRefreshTokenCookie(response: Response): void {
    response.clearCookie('RefreshToken');
  }
}

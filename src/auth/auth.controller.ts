import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  public async login(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(req.user, response);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refreshToken(req.user, response);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}

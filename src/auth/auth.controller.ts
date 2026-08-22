import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import type { Response } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtRefreshGuard } from './guards/refresh.guard';
import { CurrentUser } from '../common/decorators/currentUser.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
@Throttle({
  default: {
    limit: 10,
    ttl: 60000,
  },
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  public async verifyEmail(@Query('token') token: string) {
    await this.authService.verifyEmail(token);

    return {
      message: 'email verified successfully',
    };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async login(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refreshToken(user, response);
  }

  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  public logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}

import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { UserEntity } from './entities/user.entity';
import { UpdateDto } from './dto/update.dto';
import { ChangePasswordDto } from './dto/updatePassword.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public update(@Body() dto: UpdateDto, @CurrentUser() user: UserEntity) {
    return this.usersService.update(dto, user.id);
  }

  @Patch('updatePass')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public updatePass(
    @Body() dto: ChangePasswordDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.usersService.updatePass(dto, user.id);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public delete(@CurrentUser() user: UserEntity) {
    return this.usersService.delete(user.id);
  }
}

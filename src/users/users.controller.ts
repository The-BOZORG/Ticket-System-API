import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { UserEntity } from './entities/user.entity';
import { UpdateDto } from './dto/update.dto';
import { ChangePasswordDto } from './dto/updatePassword.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @HttpCode(HttpStatus.OK)
  public getUsers(@Query() dto: PaginationDto) {
    return this.usersService.getUser(dto);
  }

  @Get('pagination')
  @HttpCode(HttpStatus.OK)
  public pagination(@Paginate() query: PaginateQuery) {
    return this.usersService.pagination(query);
  }

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

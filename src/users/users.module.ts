import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindUserByEmailProvider } from './providers/findUserByEmail.provider';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, FindUserByEmailProvider],
  exports: [FindUserByEmailProvider],
})
export class UsersModule {}

import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindUserByEmailProvider } from './providers/findUserByEmail.provider';
import { FindUserById } from './providers/findUserById.provider';
import { AuthModule } from 'src/auth/auth.module';
import { UpdateUser } from './providers/updateUser.provider';
import { UpdatePassword } from './providers/updatePasswprd.provider';
import { DeleteUser } from './providers/deleteUser.provider';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    FindUserByEmailProvider,
    FindUserById,
    UpdateUser,
    UpdatePassword,
    DeleteUser,
  ],
  exports: [FindUserByEmailProvider],
})
export class UsersModule {}

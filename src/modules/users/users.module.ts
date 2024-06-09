import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}

import { FriendsController } from './friends.controller';
import { FriendsRepository } from './friends.repository';
import { UsersModule } from '../users/users.module';
import { FriendsService } from './friends.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, FriendsRepository],
  imports: [UsersModule],
})
export class FriendsModule {}

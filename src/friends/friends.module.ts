import { FriendsController } from './friends.controller';
import { FriendsRepository } from './friends.repository';
import { FriendsService } from './friends.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, FriendsRepository],
})
export class FriendsModule {}

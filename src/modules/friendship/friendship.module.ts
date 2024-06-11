import { FriendshipController } from './friendship.controller';
import { FriendshipRepository } from './friendship.repository';
import { FriendshipService } from './friendship.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, FriendshipRepository],
  exports: [FriendshipRepository],
})
export class FriendshipModule {}

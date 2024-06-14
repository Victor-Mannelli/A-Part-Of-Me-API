import { FriendRequestModule } from '../friend_request/friend_request.module';
import { FriendshipModule } from '../friendship/friendship.module';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  imports: [forwardRef(() => FriendRequestModule), FriendshipModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}

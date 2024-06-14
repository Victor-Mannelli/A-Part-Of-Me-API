import { FriendRequestController } from './friend_request.controller';
import { FriendRequestRepository } from './friend_request.repository';
import { FriendRequestService } from './friend_request.service';
import { UsersModule } from '../users/users.module';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [FriendRequestController],
  providers: [FriendRequestService, FriendRequestRepository],
  exports: [FriendRequestRepository],
})
export class FriendRequestModule {}

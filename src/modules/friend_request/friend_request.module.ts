import { FriendRequestController } from './friend_request.controller';
import { FriendRequestRepository } from './friend_request.repository';
import { FriendRequestService } from './friend_request.service';
import { FriendRequestGateway } from './friend_request.gateway';
import { UsersModule } from '../users/users.module';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [FriendRequestController],
  providers: [FriendRequestService, FriendRequestRepository, FriendRequestGateway],
  exports: [FriendRequestRepository],
})
export class FriendRequestModule {}

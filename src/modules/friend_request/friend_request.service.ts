import { FriendRequestRepository } from './friend_request.repository';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class FriendRequestService {
  constructor(
    readonly friendRequestRepository: FriendRequestRepository,
    readonly usersRepository: UsersRepository,
  ) {}

  async getFriendRequests(userId: string) {
    const response = await this.friendRequestRepository.getReceivedFRs(userId);
    const parsedResponse = response.map((e) => {
      return {
        friend_request_id: e.friend_request_id,
        requested_id: e.requested_id,
        requester: {
          user_id: e.requester.user_id,
          username: e.requester.username,
          avatar: e.requester.avatar,
        },
      };
    });
    return parsedResponse;
  }
  async sendFriendRequests({ userId, friendId }) {
    try {
      return await this.friendRequestRepository.postFriendRequest(userId, friendId);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async acceptFriendRequest(userId: string, id: number) {
    try {
      const friendRequests = await this.friendRequestRepository.getReceivedFRs(userId);
      if (friendRequests.some((fr) => fr.requested_id === userId)) {
        return await this.friendRequestRepository.acceptFriendRequest(id);
      } else {
        throw new NotAcceptableException();
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteFriendRequest(userId: string, friendRequestId: number) {
    try {
      const friendRequests = await this.friendRequestRepository.getFriendRequestsSentByUser(userId);
      if (!friendRequests.find((fr) => fr.friend_request_id === friendRequestId)) {
        throw new NotFoundException();
      }
      return await this.friendRequestRepository.deleteFriendRequest(friendRequestId);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

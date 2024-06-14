import { FriendRequestRepository } from './friend_request.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class FriendRequestService {
  constructor(
    readonly friendRequestRepository: FriendRequestRepository,
    readonly usersRepository: UsersRepository,
  ) {}

  async getFriendRequests(userId: string) {
    return await this.friendRequestRepository.getFriendRequests(userId);
  }
  async sendFriendRequests({ userId, friendId }) {
    try {
      return await this.friendRequestRepository.postFriendRequest(userId, friendId);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async acceptFriendRequest(id: number) {
    try {
      return await this.friendRequestRepository.acceptFriendRequest(id);
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

import { FriendRequestRepository } from './friend_request.repository';
import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class FriendRequestService {
  constructor(
    readonly friendRequestRepository: FriendRequestRepository,
    readonly usersRepository: UsersRepository,
  ) {}

  async getAllFriendRequests(userId: string) {
    const response = await this.friendRequestRepository.getFriendRequests(userId);
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
      const FRs = await this.friendRequestRepository.getSentFRs(userId);
      if (FRs.some((Fr) => Fr.requested_id === friendId)) {
        throw new ConflictException();
      }
      const response = await this.friendRequestRepository.postFriendRequest(userId, friendId);
      const parsedResponse = {
        friend_request_id: response.friend_request_id,
        requested_id: response.requested_id,
        requester: {
          user_id: response.requester.user_id,
          username: response.requester.username,
          avatar: response.requester.avatar,
        },
      };

      return parsedResponse;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async acceptFriendRequest(userId: string, id: number) {
    try {
      const friendRequests = await this.friendRequestRepository.getReceivedFRs(userId);
      if (friendRequests.some((fr) => fr.friend_request_id === id)) {
        const response = await this.friendRequestRepository.acceptFriendRequest(id);
        const parsedResponse = {
          friendship_id: response.friendship_id,
          user_id: response.user.user_id,
          username: response.user.username,
          avatar: response.user.avatar,
        };
        return parsedResponse;
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

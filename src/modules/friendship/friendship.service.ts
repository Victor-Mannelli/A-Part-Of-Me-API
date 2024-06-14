import { FriendshipRepository } from './friendship.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendshipService {
  constructor(readonly friendshipRepository: FriendshipRepository) {}

  async getFriendList(userId: string) {
    const response = await this.friendshipRepository.getFriendList(userId);
    const parsedResponse = response.map((e) => {
      return {
        friendship_id: e.friendship_id,
        user_id: e.friend_id,
        username: e.friend.username,
        avatar: e.friend.avatar,
      };
    });
    return parsedResponse;
  }

  async removeFriend(friendship_id: string) {
    return await this.friendshipRepository.delete(friendship_id);
  }
}

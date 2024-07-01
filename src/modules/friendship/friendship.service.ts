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
        user_id: e.friend_id === userId ? e.user_id : e.friend_id,
        username: e.friend_id === userId ? e.user.username : e.friend.username,
        avatar: e.friend_id === userId ? e.user.avatar?.toString('base64') : e.friend.avatar?.toString('base64'),
      };
    });
    return parsedResponse;
  }

  async removeFriend(friendship_id: string) {
    return await this.friendshipRepository.delete(friendship_id);
  }
}

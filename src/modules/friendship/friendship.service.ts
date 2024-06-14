import { FriendshipRepository } from './friendship.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendshipService {
  constructor(readonly friendshipRepository: FriendshipRepository) {}

  async getFriendList(userId: string) {
    return await this.friendshipRepository.getFriendList(userId);
  }

  async removeFriend(friendship_id: number) {
    return await this.friendshipRepository.delete(friendship_id);
  }
}

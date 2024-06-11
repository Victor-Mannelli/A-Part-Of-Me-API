import { FriendshipRepository } from './friendship.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendshipService {
  constructor(readonly friendshipRepository: FriendshipRepository) {}

  async findOne(id: number) {
    return await this.friendshipRepository.findOne(id);
  }

  // update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
  //   return `This action updates a #${id} friendship`;
  // }

  async remove(id: number) {
    return await this.friendshipRepository.delete(id);
  }
}

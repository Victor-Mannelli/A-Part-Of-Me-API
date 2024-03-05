import { FriendsRepository } from './friends.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendsService {
  constructor(readonly friendsRepository: FriendsRepository) { }
  // create(createFriendDto: CreateFriendDto) {
  //   return 'This action adds a new friend';
  // }
  // findAll() {
  //   return `This action returns all friends`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} friend`;
  // }
  // update(id: number, updateFriendDto: UpdateFriendDto) {
  //   return `This action updates a #${id} friend`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} friend`;
  // }

  async getFriendList(userId: number) {
    return await this.friendsRepository.findUserFriends(userId);
  }
  async getFriendRequests(userId: number) {
    return await this.friendsRepository.getFriendRequests(userId);
  }
  async sendFriendRequests({ userId, friendId }) {
    const userAlreadyFriends = await this.friendsRepository.findUserFriends(userId);
    if (userAlreadyFriends) {
      userAlreadyFriends.friendshipsAsUser.forEach((user) => {
        if (user.friend.user_id === friendId)
          throw { status: 401, message: 'user already exists in friend list' };
      });
      userAlreadyFriends.friendshipsAsFriend.forEach((friend) => {
        if (friend.user.user_id === friendId)
          throw { status: 401, message: 'user already exists in friend list' };
      });
    }
    return await this.friendsRepository.postFriendRequest(userId, friendId);
  }
  async acceptFriendRequest({
    friendRequestId,
    requesterId,
    requestedId,
  }: {
    friendRequestId: number;
    requesterId: number;
    requestedId: number;
  }) {
    await this.friendsRepository.acceptFriendRequest({
      friendRequestId,
      requesterId,
      requestedId,
    });
  }
}

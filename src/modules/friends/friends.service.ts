// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { FriendsRepository } from './friends.repository';

@Injectable()
export class FriendsService {
  constructor(
    readonly friendsRepository: FriendsRepository,
    readonly usersRepository: UsersRepository,
  ) {}
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

  async getFriendList(userId: string) {
    const response = await this.friendsRepository.findUserFriends(userId);
    const friends = [
      ...response.friendshipsAsUser.map((friendship) => friendship.friend),
      ...response.friendshipsAsFriend.map((friendship) => friendship.user),
    ].sort();

    return friends;
  }
  async getFriendRequests(userId: string) {
    return await this.friendsRepository.getFriendRequests(userId);
  }
  async getStrangersAndFRs(userId: string) {
    const userFriends = await this.getFriendList(userId);
    const userFriendsIds = userFriends.map((user) => user.user_id);

    const strangers = await this.usersRepository.findNewPossibleFriends([...userFriendsIds, userId]);
    const FRs = await this.friendsRepository.getFriendRequests(userId);

    return { strangers: [...strangers], friendRequests: [...FRs] };
  }

  async sendFriendRequests({ userId, friendId }) {
    const userFriends = await this.friendsRepository.findUserFriends(userId);
    const friendshipsAsUser = userFriends.friendshipsAsUser.some((friendship) => friendship.friend.user_id === friendId);
    const friendshipsAsFriend = userFriends.friendshipsAsFriend.some((friendship) => friendship.user.user_id === friendId);

    if (friendshipsAsUser || friendshipsAsFriend) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'User is already in friend list!',
        },
        HttpStatus.CONFLICT,
      );
    }

    return await this.friendsRepository.postFriendRequest(userId, friendId);
  }

  async acceptFriendRequest({ friendRequestId, requesterId, requestedId }: { friendRequestId: number; requesterId: string; requestedId: string }) {
    return await this.friendsRepository.acceptFriendRequest({
      friendRequestId,
      requesterId,
      requestedId,
    });
  }

  async deleteFriendRequest(userId: string, friendRequestId: number) {
    const friendRequests = await this.friendsRepository.getFriendRequestsSentByUser(userId);
    if (!friendRequests.find((fr) => fr.friend_request_id === friendRequestId)) {
      throw new NotFoundException();
    }
    await this.friendsRepository.deleteFriendRequest(friendRequestId);
    return friendRequests.filter((fr) => fr.friend_request_id !== friendRequestId);
  }
}

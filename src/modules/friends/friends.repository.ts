import { AcceptFriendRequestDto } from './friends.dto';
import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class FriendsRepository {
  async findUserFriends(userId: number) {
    return await prisma.user.findFirst({
      where: {
        user_id: userId,
      },
      select: {
        friendshipsAsUser: {
          select: {
            created_at: true,
            friend: {
              select: {
                user_id: true,
                username: true,
              },
            },
          },
        },
        friendshipsAsFriend: {
          select: {
            created_at: true,
            user: {
              select: {
                user_id: true,
                username: true,
              },
            },
          },
        },
      },
    });
  }

  async getFriendRequests(userId: number) {
    return await prisma.friendRequest.findMany({
      where: {
        OR: [{ requested_id: userId }, { requester_id: userId }],
      },
      select: {
        friend_request_id: true,
        requester_id: true,
        requested_id: true,
      },
    });
  }
  async getFriendRequestsSentByUser(userId: number) {
    return await prisma.friendRequest.findMany({
      where: {
        requester_id: userId,
      },
      select: {
        friend_request_id: true,
        requester_id: true,
        requested_id: true,
      },
    });
  }

  async postFriendRequest(userId: number, friendId: number) {
    return await prisma.friendRequest.create({
      data: {
        requester_id: userId,
        requested_id: friendId,
      },
    });
  }

  async acceptFriendRequest(acceptFriendRequestDto: AcceptFriendRequestDto) {
    await prisma.friendship.create({
      data: {
        user_id: acceptFriendRequestDto.requesterId,
        friend_id: acceptFriendRequestDto.requestedId,
      },
    });
    await prisma.friendRequest.delete({
      where: {
        friend_request_id: acceptFriendRequestDto.friendRequestId,
      },
    });
  }
  async deleteFriendRequest(friendRequestId: number) {
    await prisma.friendRequest.delete({
      where: {
        friend_request_id: friendRequestId,
      },
    });
  }
}

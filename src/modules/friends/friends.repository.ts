import { AcceptFriendRequestDto } from './friends.dto';
import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class FriendsRepository {
  async findUserFriends(userId: string) {
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

  async getFriendRequests(userId: string) {
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
  async getFriendRequestsSentByUser(userId: string) {
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

  async postFriendRequest(userId: string, friendId: string) {
    return await prisma.friendRequest.create({
      data: {
        requester_id: userId,
        requested_id: friendId,
      },
    });
  }

  async acceptFriendRequest(acceptFriendRequestDto: AcceptFriendRequestDto) {
    return await prisma.friendship.create({
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
    return await prisma.friendRequest.delete({
      where: {
        friend_request_id: friendRequestId,
      },
    });
  }
}

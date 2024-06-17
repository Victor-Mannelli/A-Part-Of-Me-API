import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class FriendRequestRepository {
  async getFriendRequests(userId: string) {
    return await prisma.friendRequest.findMany({
      where: {
        OR: [{ requested_id: userId }, { requester_id: userId }],
      },
      select: {
        friend_request_id: true,
        requester_id: true,
        requested_id: true,
        requester: true,
      },
    });
  }
  async getReceivedFRs(userId: string) {
    return await prisma.friendRequest.findMany({
      where: {
        requested_id: userId,
      },
      select: {
        friend_request_id: true,
        requester_id: true,
        requested_id: true,
        requester: true,
      },
    });
  }
  async getSentFRs(userId: string) {
    return await prisma.friendRequest.findMany({
      where: {
        requester_id: userId,
      },
      select: {
        friend_request_id: true,
        requester_id: true,
        requested_id: true,
        requester: true,
      },
    });
  }

  async postFriendRequest(userId: string, friendId: string) {
    return await prisma.friendRequest.create({
      data: {
        requester_id: userId,
        requested_id: friendId,
      },
      select: {
        friend_request_id: true,
        requester_id: true,
        requested_id: true,
        requester: true,
      },
    });
  }
  async acceptFriendRequest(friendRequestId: number) {
    const newFriendShipData = await prisma.friendRequest.delete({
      where: {
        friend_request_id: friendRequestId,
      },
    });
    return await prisma.friendship.create({
      data: {
        user_id: newFriendShipData.requester_id,
        friend_id: newFriendShipData.requested_id,
      },
      include: {
        user: true,
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

  async deleteFriendRequest(friendRequestId: number) {
    return await prisma.friendRequest.delete({
      where: {
        friend_request_id: friendRequestId,
      },
      select: {
        friend_request_id: true,
      },
    });
  }
}

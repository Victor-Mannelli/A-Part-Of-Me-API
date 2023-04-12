import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getFriendRequests(userId: number) {
  return await prisma.friendRequest.findMany({
    where: {
      OR: [
        { requested_id: userId },
        { requester_id: userId },
      ]
    },
    select: {
      friend_request_id: true,
      requester_id: true,
      requested_id: true
    },
  });
}

export async function postFriendRequest(userId: number, friendId: number) {
  return await prisma.friendRequest.create({
    data: {
      requester_id: userId,
      requested_id: friendId
    }
  });
}

export async function acceptFriendRequest(friendRequestId: number, requesterId: number, requestedId: number) {
  await prisma.friendship.create({
    data: {
      user_id: requesterId,
      friend_id: requestedId
    }
  });

  await prisma.friendRequest.delete({
    where: {
      friend_request_id: friendRequestId
    }
  });
}

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
      requester_id: true,
      requested_id: true
    }
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

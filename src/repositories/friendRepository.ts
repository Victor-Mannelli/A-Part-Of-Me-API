import { prisma } from '../config/database';

export async function findUserFriends(userId: number) {
  return await prisma.user.findFirst({
    where: {
      user_id: userId
    },
    select: {
      friendshipsAsUser: {
        select: {
          created_at: true,
          friend: {
            select: {
              user_id: true,
              username: true
            }
          }
        }
      },
      friendshipsAsFriend: {
        select: {
          user: {
            select: {
              user_id: true,
              username: true,
            }
          }
        }
      }
    }
  });
}

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

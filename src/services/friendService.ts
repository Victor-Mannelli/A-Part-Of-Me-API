import { acceptFriendRequest, findUserFriends, getFriendRequests, postFriendRequest } from '../repositories';

export async function getUserFriendListService(userId: number) {
  return await findUserFriends(userId);
}
export async function getFriendRequestsService(userId: number) {
  return await getFriendRequests(userId);
}
export async function sendFriendRequestsService({ userId, friendId }: { userId: number, friendId: number }) {
  const userAlreadyFriends = await findUserFriends(userId);
  if (userAlreadyFriends) {
    userAlreadyFriends.friendshipsAsUser.forEach(user => {
      if (user.friend.user_id === friendId) throw ({ status: 401, message: 'user already exists in friend list' });
    });
    userAlreadyFriends.friendshipsAsFriend.forEach(friend => {
      if (friend.user.user_id === friendId) throw ({ status: 401, message: 'user already exists in friend list' });
    });
  }
  return await postFriendRequest(userId, friendId);
}
export async function acceptFriendRequestService({
  friendRequestId,
  requesterId,
  requestedId
}: {
  friendRequestId: number,
  requesterId: number,
  requestedId: number
}) {
  await acceptFriendRequest(friendRequestId, requesterId, requestedId);
}

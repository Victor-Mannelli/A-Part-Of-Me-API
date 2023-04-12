import { acceptFriendRequest, getFriendRequests, postFriendRequest } from '../repositories';

export async function getFriendRequestsService(userId: number) {
  return await getFriendRequests(userId);
}
export async function sendFriendRequestsService({ userId, friendId }: { userId: number, friendId: number }) {
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

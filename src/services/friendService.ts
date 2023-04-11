import { getFriendRequests, postFriendRequest } from '../repositories';

export async function getFriendRequestsService(userId: number) {
  return await getFriendRequests(userId);
}

export async function sendFriendRequestsService({ userId, friendId }: { userId: number, friendId: number }) {
  return await postFriendRequest(userId, friendId);
}

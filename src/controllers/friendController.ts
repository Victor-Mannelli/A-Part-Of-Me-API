import { Request, Response } from 'express';
import { acceptFriendRequestService, getFriendRequestsService, sendFriendRequestsService } from '../services';

export async function getFriendRequests(_req: Request, res: Response) {
  const userId: number = res.locals.user.user_id;
  const friendRequests = await getFriendRequestsService(userId);
  return res.status(200).send(friendRequests);
}

export async function sendFriendRequest(req: Request, res: Response) {
  const userId: number = res.locals.user.user_id;
  const response = await sendFriendRequestsService({ userId, friendId: req.body.friend_id });
  return res.status(200).send(response);
}

export async function acceptFriendRequest(req: Request, res: Response) {
  await acceptFriendRequestService({
    friendRequestId: req.body.friend_request_id,
    requesterId: req.body.requester_id,
    requestedId: req.body.requested_id
  });
  return res.sendStatus(200);
}

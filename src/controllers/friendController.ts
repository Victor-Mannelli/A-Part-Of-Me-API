import { Request, Response } from 'express';
import { getFriendRequestsService, sendFriendRequestsService } from '../services';

export async function getFriendRequests(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    const friendRequests = await getFriendRequestsService(userId);
    res.status(200).send(friendRequests);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function sendFriendRequest(req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    const response = await sendFriendRequestsService({ userId, friendId: req.body.friend_id });
    res.status(200).send(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}
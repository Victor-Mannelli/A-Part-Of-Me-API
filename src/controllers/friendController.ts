import { Request, Response } from 'express';
import { acceptFriendRequestService, getFriendRequestsService, getUserFriendListService, sendFriendRequestsService } from '../services';
import httpStatus from 'http-status';

export async function getFriendList(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    const response = await getUserFriendListService(userId);
    res.status(200).send(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}

export async function getFriendRequests(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    const friendRequests = await getFriendRequestsService(userId);
    return res.status(200).send(friendRequests);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}

export async function sendFriendRequest(req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    const response = await sendFriendRequestsService({ userId, friendId: req.body.friend_id });
    return res.status(200).send(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}

export async function acceptFriendRequest(req: Request, res: Response) {
  try {
    await acceptFriendRequestService({
      friendRequestId: req.body.friend_request_id,
      requesterId: req.body.requester_id,
      requestedId: req.body.requested_id
    });
    return res.sendStatus(200);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}

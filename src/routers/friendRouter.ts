import { Router } from 'express';
import { JoiValidation, validateAuth } from '../middlewares';
import { userFriendList, sendFriendRequest, getFriendRequests } from '../controllers';
import { friendRequestId } from '../utils/schemas';

const friendRouter = Router();

friendRouter
  .get('/friendlist', validateAuth, userFriendList)
  .get('/friendrequest', validateAuth, getFriendRequests)
  .post('/friendrequest', validateAuth, JoiValidation(friendRequestId, 'body'), sendFriendRequest);

export { friendRouter };

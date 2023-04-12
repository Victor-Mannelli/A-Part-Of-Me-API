import { Router } from 'express';
import { JoiValidation, validateAuth } from '../middlewares';
import { userFriendList, sendFriendRequest, getFriendRequests, acceptFriendRequest } from '../controllers';
import { friendIdSchema, friendRequestSchema } from '../utils/schemas';

const friendRouter = Router();

friendRouter
  .use(validateAuth)
  .get('/friendlist', userFriendList)
  .get('/friendrequest', getFriendRequests)
  .post('/friendrequest', JoiValidation(friendIdSchema, 'body'), sendFriendRequest)
  .post('/acceptfriend', JoiValidation(friendRequestSchema, 'body'), acceptFriendRequest);

export { friendRouter };

import { Router } from 'express';
import { changePassword, deleteAccount, userFriendList, userData, sendFriendRequest, allUsers } from '../controllers';
import { JoiValidation, validateAuth } from '../middlewares';
import { changePasswordSchema} from '../utils/schemas';

const userRouter = Router();

userRouter
  .use(validateAuth)
  .get('/userdata', userData)
  .get('/allusers', allUsers)
  .get('/friendlist', userFriendList)
  .post('/friendrequest', sendFriendRequest)
  .post('/updatePassword', changePassword)
  .delete('/accountDeletion', JoiValidation(changePasswordSchema, 'body'), deleteAccount);

export { userRouter };

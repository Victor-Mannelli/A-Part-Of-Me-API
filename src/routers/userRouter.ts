import { Router } from 'express';
import { changePassword, deleteAccount, userData, allUsers } from '../controllers';
import { JoiValidation, validateAuth } from '../middlewares';
import { changePasswordSchema} from '../utils/schemas';

const userRouter = Router();

userRouter
  .use(validateAuth)
  .get('/userdata', userData)
  .get('/allusers', allUsers)
  .post('/updatePassword', changePassword)
  .delete('/accountDeletion', JoiValidation(changePasswordSchema, 'body'), deleteAccount);

export { userRouter };

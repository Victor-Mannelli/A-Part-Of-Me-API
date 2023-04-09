import { Router } from 'express';
import { changePassword, deleteAccount, getUserData, singIn, singUp } from '../controllers';
import { JoiValidationBody, validateAuth } from '../middlewares';
import { changePasswordSchema, signInSchema, signUpSchema } from '../utils/schemas';

const userRouter = Router();

userRouter
  .post('/signup', JoiValidationBody(signUpSchema), singUp)
  .post('/signin', JoiValidationBody(signInSchema), singIn)
  .get('/userdata', validateAuth, getUserData)
  .post('/updatePassword', validateAuth, changePassword)
  .delete('/accountDeletion', JoiValidationBody(changePasswordSchema), validateAuth, deleteAccount);

export { userRouter };

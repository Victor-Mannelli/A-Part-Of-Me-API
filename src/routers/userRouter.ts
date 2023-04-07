import JoiValidation from '../middlewares/joiValidationMiddleware';
import { Router } from 'express';
import { validateAuth } from '../middlewares';
import { changePassword, deleteAccount, getUserData, singIn, singUp } from '../controllers';
import * as authSchema from '../utils/schemas';

const userRouter = Router();

userRouter.post('/signup', JoiValidation(authSchema.signUpSchema), singUp);
userRouter.post('/signin', JoiValidation(authSchema.signInSchema), singIn);
userRouter.get('/userdata', validateAuth, getUserData);
userRouter.post('/updatePassword', validateAuth, changePassword);
userRouter.delete('/accountDeletion', JoiValidation(authSchema.changePasswordSchema), validateAuth, deleteAccount);

export default userRouter;

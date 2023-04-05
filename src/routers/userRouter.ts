import { Router } from 'express';
import JoiValidation from '../middlewares/joiValidationMiddleware';
import * as authMiddleware from '../middlewares/authMiddleware';
import * as authSchema from '../utils/schemas';
import * as userController from '../controllers/userController';
import * as userMiddleware from '../middlewares/userMiddleware';

const userRouter = Router();

userRouter.post('/signup', 
  JoiValidation(authSchema.signUpSchema), 
  userMiddleware.validateSignUp, 
  userController.singUp
);

userRouter.post('/signin', 
  JoiValidation(authSchema.signInSchema), 
  userMiddleware.validateSignIn, 
  userController.singIn
);

userRouter.post('/updatePassword', 
  authMiddleware.validateAuthToken, 
  userController.changePassword
);

userRouter.delete('/accountDeletion', 
  JoiValidation(authSchema.changePasswordSchema), 
  authMiddleware.validateAuthToken, 
  userController.deleteAccount
);

export default userRouter;

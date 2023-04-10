import { Router } from 'express';
import { singUp, singIn } from '../controllers';
import { JoiValidation } from '../middlewares';
import { signUpSchema, signInSchema } from '../utils/schemas';

const authRouter = Router();

authRouter
  .post('/signup', JoiValidation(signUpSchema, 'body'), singUp)
  .post('/signin', JoiValidation(signInSchema, 'body'), singIn);

export { authRouter };

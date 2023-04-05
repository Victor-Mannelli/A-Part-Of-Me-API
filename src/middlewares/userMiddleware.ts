import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as repository from '../repositories/userRepository';
import * as types from '../utils/types/index';

export async function validateSignUp(req: Request, res: Response, next: NextFunction) {
  try {
    const body: types.SignUpBody = req.body;
    const result = await repository.checkEmail(body.email);
    if (result !== null) {
      return res.status(409).send({ message: 'Email already registered' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function validateSignIn(req: Request, res: Response, next: NextFunction) {
  try {
    const body: types.SignInBody = req.body;
    const user = await repository.checkEmail(body.email);
    if (user === null) {
      return res.status(401).send({ message: 'This email is not registered' });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ message: 'Password is incorrect' });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

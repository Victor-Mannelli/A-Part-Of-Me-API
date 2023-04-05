import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as userService from '../services/userService';
import * as types from '../utils/types/index';

export async function singUp(req: Request, res: Response) {
  try {
    const body: types.SignUpBody = req.body;
    await userService.createNewUser(body);
    res.status(201).send({ message: 'User Created' });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function singIn(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.id;
    const token: string = uuid();
    await userService.login({ userId, token });
    res.status(200).send(token);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function changePassword(req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.id;
    const newPassword: string = req.body.password;
    await userService.changePassword({ userId, newPassword });
    res.status(200).send({ message: 'Password Changed Successfully' });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function deleteAccount(_req: Request, res: Response) {
  try {
    const userId = res.locals.user.user_id;
    await userService.deleteAccount(userId);
    res.status(200).send({ message: 'User Deleted Successfully' });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

import { Request, Response } from 'express';
import { changePasswordService, createNewUserService, deleteAccountService, getUserDataService, loginService } from '../services';
import * as types from '../utils/types/index';

export async function singUp(req: Request, res: Response) {
  try {
    const body: types.SignUpBody = req.body;
    const response = await createNewUserService(body);
    response === 'error' 
      ? res.status(401).send({ message: 'Email is already registered' })
      : res.status(201).send({ message: 'User created successfully!' });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function singIn(req: Request, res: Response) {
  try {
    const body: types.SignInBody = req.body;
    const response = await loginService(body);
    if (response === 'user404') res.status(404).send({message: 'This email is not registered'});
    if (response === 'wrongPass') res.status(401).send({message: 'Password is incorrect'});
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function getUserData(req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.id;
    return await getUserDataService(userId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function changePassword(req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.id;
    const newPassword: string = req.body.password;
    await changePasswordService({ userId, newPassword });
    res.status(200).send({ message: 'Password Changed Successfully' });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function deleteAccount(_req: Request, res: Response) {
  try {
    const userId = res.locals.user.user_id;
    await deleteAccountService(userId);
    res.status(200).send({ message: 'User Deleted Successfully' });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

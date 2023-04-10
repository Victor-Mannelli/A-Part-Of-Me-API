import { Request, Response } from 'express';
import { allUsersService, changePasswordService, createNewUserService, deleteAccountService, getUserDataService, getUserFriendListService, loginService, sendFriendRequestService } from '../services';
import * as types from '../utils/types/index';

export async function singUp(req: Request, res: Response) {
  try {
    const body: types.SignUpBody = req.body;
    await createNewUserService(body);
    res.status(201).send({ message: 'User created successfully!' });
  } catch (error) {
    return res.sendStatus(500);
  }
}
export async function singIn(req: Request, res: Response) {
  try {
    const body: types.SignInBody = req.body;
    const response = await loginService(body);
    res.status(200).send(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}
export async function userData(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.id;
    const response = await getUserDataService(userId);
    res.status(200).send(response);
  } catch (error) {
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
    return res.sendStatus(500);
  }
}
export async function deleteAccount(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    await deleteAccountService(userId);
    res.status(200).send({ message: 'User Deleted Successfully' });

  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function userFriendList(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    const response = await getUserFriendListService(userId);
    res.status(200).send(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}
export async function sendFriendRequest(req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    const response = await sendFriendRequestService({ userId, friendId: req.body.friendId });
    res.status(200).send(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}
export async function allUsers(req: Request, res: Response) {
  try {
    const response = await allUsersService(); 
    res.status(200).send(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}

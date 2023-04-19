import { Request, Response } from 'express';
import { allUsersService, changePasswordService, createNewUserService, deleteAccountService, getUserDataService, loginService } from '../services';
import * as types from '../utils/types/index';
import httpStatus from 'http-status';

export async function singUp(req: Request, res: Response) {
  try {
    const body: types.SignUpBody = req.body;
    await createNewUserService(body);
    res.status(201).send({ message: 'User created successfully!' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}
export async function singIn(req: Request, res: Response) {
  try {
    const body: types.SignInBody = req.body;
    const response = await loginService(body);
    res.status(200).send(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}
export async function userData(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.id;
    const response = await getUserDataService(userId);
    res.status(200).send(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}
export async function changePassword(req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.id;
    const newPassword: string = req.body.password;
    await changePasswordService({ userId, newPassword });
    res.status(200).send({ message: 'Password Changed Successfully' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}
export async function deleteAccount(_req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.user_id;
    await deleteAccountService(userId);
    res.status(200).send({ message: 'User Deleted Successfully' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}
export async function allUsers(_req: Request, res: Response) {
  try {
    const response = await allUsersService(); 
    res.status(200).send(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}

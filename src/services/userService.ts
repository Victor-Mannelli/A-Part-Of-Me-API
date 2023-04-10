import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { v4 as uuid } from 'uuid';
import { changePassword, checkEmail, checkUsername, createNewUser, deleteAccount, deleteUserSessions, findFirstUserData, findUserFriends, getUsersList, logingUser, postFriendRequest } from '../repositories';
import { CustomError } from '../middlewares';
import { ChangePasswordBody, SignUpBody } from '../utils/types';


export async function createNewUserService(params: SignUpBody) {
  const result = await checkEmail(params.email);
  if (result !== null) throw new CustomError({
    status: httpStatus.UNAUTHORIZED,
    message: 'User already exists!'
  });
  const hashedPassword: string = bcrypt.hashSync(params.password, 10);
  return await createNewUser({ email: params.email, username: params.username, hashedPassword });
}
export async function loginService({ login, password }: { login: string, password: string }) {
  let user;
  login.includes('@')
    ? user = await checkEmail(login)
    : user = await checkUsername(login);
  if (user === null) throw new CustomError({
    status: httpStatus.NOT_FOUND,
    message: 'User doesn\'t exist!'
  });

  if (!bcrypt.compareSync(password, user.password)) throw new CustomError({
    status: httpStatus.UNAUTHORIZED,
    message: 'Wrong password!'
  });

  const userId: number = user.user_id;
  await deleteUserSessions(userId);
  return await logingUser({ userId, token: uuid() });
}
export async function getUserDataService(userId: number) {
  return await findFirstUserData(userId);
}
export async function changePasswordService(params: ChangePasswordBody) {
  const newHashedPassword = bcrypt.hashSync(params.newPassword, 10);
  return await changePassword({ userId: params.userId, newHashedPassword });
}
export async function deleteAccountService(userId: number) {
  return await deleteAccount(userId);
}

export async function getUserFriendListService(userId: number) {
  return await findUserFriends(userId);
}
export async function sendFriendRequestService({ userId, friendId }: { userId: number, friendId: number }) {
  return await postFriendRequest(userId, friendId);
}
export async function allUsersService(){
  return await getUsersList();
}

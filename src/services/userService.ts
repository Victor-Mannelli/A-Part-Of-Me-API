import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { changePassword, checkEmail, checkUsername, createNewUser, deleteAccount, deleteUserSessions, findFirstUserData, logingUser } from '../repositories';
import * as types from '../utils/types/index';

export async function createNewUserService(params: types.SignUpBody) {
  const result = await checkEmail(params.email);
  if (result !== null) return 'error';
  // if (result !== null) throw new 401;

  const hashedPassword: string = bcrypt.hashSync(params.password, 10);
  await createNewUser({ email: params.email, username: params.username, hashedPassword });
  return;
}
export async function loginService({ login, password }: { login: string, password: string }) {
  let user;
  login.includes('@')
    ? user = await checkEmail(login)
    : user = await checkUsername(login);
  if (user === null) return 'user404';

  if (!bcrypt.compareSync(password, user.password)) {
    return 'wrongPass';
  }

  const userId: number = user.user_id;
  await deleteUserSessions(userId);
  return await logingUser({ userId, token: uuid() });
}
export async function getUserDataService(userId: number) {
  return await findFirstUserData(userId);
}
export async function changePasswordService(params: types.ChangePasswordBody) {
  const newHashedPassword = bcrypt.hashSync(params.newPassword, 10);
  return await changePassword({ userId: params.userId, newHashedPassword });
}
export async function deleteAccountService(userId: number) {
  return await deleteAccount(userId);
}

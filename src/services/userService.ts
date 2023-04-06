import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { changePassword, checkEmail, createNewUser, deleteAccount, login } from '../repositories';
import * as types from '../utils/types/index';

export async function createNewUserService(params: types.SignUpBody) {
  const result = await checkEmail(params.email);
  if (result !== null) return 'error';
  // if (result !== null) throw new 401;

  const hashedPassword: string = bcrypt.hashSync(params.password, 10);
  await createNewUser({ email: params.email, username: params.username, hashedPassword });
  return;
}
export async function loginService(params: types.SignInBody) {
  const user = await checkEmail(params.email);
  if (user === null) return {message: 'This email is not registered'};

  if (!bcrypt.compareSync(params.password, user.password)) {
    return {message: 'Password is incorrect'};
  }

  const userId: number = user.user_id;
  return await login({ userId, token: uuid() });
}
export async function changePasswordService(params: types.ChangePasswordBody) {
  try {
    const newHashedPassword = bcrypt.hashSync(params.newPassword, 10);
    await changePassword({userId: params.userId, newHashedPassword});
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function deleteAccountService(userId: number) {
  try {
    await deleteAccount(userId);
  } catch (error) {
    console.log(error);
    return;
  }
}

import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository';
import * as types from '../utils/types/index';

export async function createNewUser(params: types.SignUpBody) {
  try {
    const hashedPassword: string = bcrypt.hashSync(params.password, 10);
    await userRepository.createNewUser({ email: params.email, username: params.username, hashedPassword });
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function login(params: types.Login) {
  try {
    await userRepository.login({ userId: params.userId, token: params.token });
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function changePassword(params: types.ChangePasswordBody) {
  try {
    const newHashedPassword = bcrypt.hashSync(params.newPassword, 10);
    await userRepository.changePassword({userId: params.userId, newHashedPassword});
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function deleteAccount(userId: number) {
  try {
    await userRepository.deleteAccount(userId);
  } catch (error) {
    console.log(error);
    return;
  }
}

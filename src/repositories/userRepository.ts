import * as types from '../utils/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email
    }
  });
}
export async function createNewUser(params: types.CreateNewUser) {
  await prisma.user.create({
    data: {
      email: params.email,
      username: params.username,
      password: params.hashedPassword
    }
  });
}

export async function login(params: types.Login) {
  await prisma.session.create({
    data: {
      user_id: params.userId,
      token: params.token
    }
  });
}

export async function findUserId(token: string) {
  return await prisma.session.findFirst({
    where: {
      token: token
    }
  });
}
// export async function changePassword(params: types.ChangePassword) {
//   await prisma.user.update({
//     where: {
//       id: params.userId
//     },
//     data: {
//       password: params.newHashedPassword
//     }
//   });
// }

// export async function deleteAccount(userId: number) {
//   await prisma.user.delete({
//     where: {
//       id: userId
//     }
//   });
// }

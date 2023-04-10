import * as types from '../utils/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email
    }
  });
}
export async function checkUsername(username: string) {
  return await prisma.user.findFirst({
    where: {
      username
    }
  });
}
export async function findUserById(userId: number) {
  return await prisma.user.findFirst({
    where: {
      user_id: userId
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
export async function logingUser({ userId, token }: { userId: number, token: string }) {
  return await prisma.session.create({
    data: {
      user_id: userId,
      token
    },
    select: {
      token: true
    }
  });
}
export async function findFirstUserData(userId: number) {
  return await prisma.user.findFirst({
    where: {
      user_id: userId
    },
    select: {
      username: true,
      user_id: true,
    }
  });
}

export async function deleteUserSessions(userId: number) {
  await prisma.session.deleteMany({
    where: {
      user_id: userId
    }
  });
}
export async function findUserId(token: string) {
  return await prisma.session.findFirst({
    where: {
      token
    }
  });
}
export async function changePassword(params: types.ChangePassword) {
  await prisma.user.update({
    where: {
      user_id: params.userId
    },
    data: {
      password: params.newHashedPassword
    }
  });
}
export async function deleteAccount(userId: number) {
  await prisma.user.delete({
    where: {
      user_id: userId
    }
  });
}

export async function findUserFriends(userId: number) {
  return await prisma.user.findFirst({
    where: {
      user_id: userId
    },
    select: {
      friendshipsAsUser: {
        select: {
          friend: {
            select: {
              user_id: true,
              username: true
            }
          }
        }
      }
    }
  });
}
export async function postFriendRequest(userId: number, friendId: number) {
  return await prisma.friendRequest.create({
    data: {
      requester_id: userId,
      requested_id: friendId
    }
  });
}
export async function getUsersList() {
  return await prisma.user.findMany({
    select: {
      user_id: true,
      username: true,
    }
  });
}

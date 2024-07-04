import { ChangePassword, CreateNewUser, prisma, UpdateUserWithImagesAsBytes } from 'src/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  async checkEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async checkUsername(username: string) {
    return await prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
  async findUserById(userId: string) {
    return await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
  }
  async findUser(userId: string) {
    return await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        UserAnimeList: true,
      },
    });
  }

  async createNewUser(params: CreateNewUser) {
    await prisma.user.create({
      data: {
        email: params.email,
        username: params.username,
        password: params.hashedPassword,
      },
    });
  }

  async getUsersList(userId: string) {
    return await prisma.user.findMany({
      select: {
        user_id: true,
        username: true,
        avatar: true,
      },
      where: {
        user_id: {
          not: userId,
        },
      },
    });
  }
  async findNewPossibleFriends(excludedUsers: string[]) {
    return await prisma.user.findMany({
      select: {
        user_id: true,
        username: true,
        avatar: true,
      },
      where: {
        user_id: {
          notIn: excludedUsers,
        },
      },
    });
  }

  async changePassword(params: ChangePassword) {
    await prisma.user.update({
      where: {
        user_id: params.userId,
      },
      data: {
        password: params.newHashedPassword,
      },
    });
  }
  async updateUser(updateUserDto: UpdateUserWithImagesAsBytes) {
    return await prisma.user.update({
      where: {
        user_id: updateUserDto.user_id,
      },
      data: updateUserDto,
    });
  }
  async deleteAccount(userId: string) {
    await prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
  }
}

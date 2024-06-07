import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as types from 'src/utils/types';
import { prisma } from 'src/utils';

@Injectable()
export class UsersRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  async checkEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
  async checkUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
  async findUserById(userId: number) {
    return await this.prisma.user.findFirst({
      where: {
        user_id: userId,
      },
    });
  }

  async createNewUser(params: types.CreateNewUser) {
    await this.prisma.user.create({
      data: {
        email: params.email,
        username: params.username,
        password: params.hashedPassword,
      },
    });
  }

  async findUser(userId: number) {
    return await this.prisma.user.findFirst({
      where: {
        user_id: userId,
      },
      select: {
        username: true,
        user_id: true,
      },
    });
  }
  async getUsersList() {
    return await this.prisma.user.findMany({
      select: {
        user_id: true,
        username: true,
      },
    });
  }

  async changePassword(params: types.ChangePassword) {
    await this.prisma.user.update({
      where: {
        user_id: params.userId,
      },
      data: {
        password: params.newHashedPassword,
      },
    });
  }
  async deleteAccount(userId: number) {
    await this.prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
  }
}

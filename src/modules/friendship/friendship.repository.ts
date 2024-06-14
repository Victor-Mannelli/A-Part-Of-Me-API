import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class FriendshipRepository {
  // async findOne(id: number) {
  //   return await prisma.friendship.findUnique({
  //     where: {
  //       friendship_id: id,
  //     },
  //   });
  // }

  async getFriendList(userId: string) {
    return await prisma.friendship.findMany({
      where: {
        OR: [{ friend_id: userId }, { user_id: userId }],
      },
    });
  }
  async delete(id: number) {
    return await prisma.friendship.delete({
      where: {
        friendship_id: id,
      },
    });
  }
}

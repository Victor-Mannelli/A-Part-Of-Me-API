import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class FriendshipRepository {
  async findOne(id: number) {
    return await prisma.friendship.findUnique({
      where: {
        friendship_id: id,
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

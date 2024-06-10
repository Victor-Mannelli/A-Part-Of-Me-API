import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class MessagesRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async getMessages({ authorId, receiverId }: { authorId: string; receiverId: string }) {
    return await prisma.message.findMany({
      where: {
        OR: [
          {
            author_id: authorId,
            receiver_id: receiverId,
          },
          {
            author_id: receiverId,
            receiver_id: authorId,
          },
        ],
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        receiver: {
          select: {
            username: true,
          },
        },
      },
    });
  }
  async postMessages({ authorId, receiverId, message }: { authorId: string; receiverId: string; message: string }) {
    return await prisma.message.create({
      data: {
        author_id: authorId,
        receiver_id: receiverId,
        message,
      },
    });
  }
}

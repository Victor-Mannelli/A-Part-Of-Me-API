import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class MessagesRepository {
  async getMessages({ author_id, receiver_id }: { author_id: string; receiver_id: string }) {
    return await prisma.message.findMany({
      where: {
        OR: [
          {
            author_id,
            receiver_id,
          },
          {
            author_id: receiver_id,
            receiver_id: author_id,
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
  async postMessages({ author_id, receiver_id, message }: { author_id: string; receiver_id: string; message: string }) {
    return await prisma.message.create({
      data: {
        author_id,
        receiver_id,
        message,
      },
      select: {
        message_id: true,
        message: true,
        created_at: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
  }
  async delete(id: number) {
    return await prisma.message.delete({
      where: {
        message_id: id,
      },
    });
  }
}

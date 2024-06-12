import { MessageType } from 'src/utils/types/messages';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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
        message_id: uuidv4(),
        author_id,
        receiver_id,
        message,
        created_at: Date.now().toString(),
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

  async postManyMessages(messages: MessageType[]) {
    return await prisma.message.createMany({
      data: messages,
    });
  }

  async delete(id: string) {
    return await prisma.message.delete({
      where: {
        message_id: id,
      },
    });
  }
}

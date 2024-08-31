import { MessageType } from './messages.type';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from 'src/utils';

@Injectable()
export class MessagesRepository {
  async getMessages({ room_id }: { room_id: string }) {
    return await prisma.message.findMany({
      where: {
        room_id,
      },
      include: {
        author: {
          select: {
            user_id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
    // return await prisma.message.findMany({
    //   where: {
    //     OR: [
    //       {
    //         author_id,
    //         receiver_id,
    //       },
    //       {
    //         author_id: receiver_id,
    //         receiver_id: author_id,
    //       },
    //     ],
    //   },
    //   orderBy: {
    //     created_at: 'asc',
    //   },
    //   include: {
    //     author: {
    //       select: {
    //         username: true,
    //       },
    //     },
    //     receiver: {
    //       select: {
    //         username: true,
    //       },
    //     },
    //   },
    // });
  }
  async postMessages({ author_id, receiver_id, message, room_id }: { author_id: string; receiver_id: string; message: string; room_id: string }) {
    return await prisma.message.create({
      data: {
        message_id: uuidv4(),
        author_id,
        receiver_id,
        room_id,
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

  async updateMessage({ message_id, newMessage }: { message_id: string; newMessage: string }) {
    return await prisma.message.update({
      where: {
        message_id,
      },
      data: {
        message: newMessage,
        edited: true,
      },
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

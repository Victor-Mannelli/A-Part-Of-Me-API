import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { MessagesRepository } from './messages.repository';
import { MessageType } from './messages.type';

@Injectable()
export class MessagesService {
  constructor(
    readonly messagesRepository: MessagesRepository,
    readonly usersRepository: UsersRepository,
  ) {}

  async getMessages({ user_id, room_id }: { user_id: string; room_id: string }) {
    const messages = await this.messagesRepository.getMessages({ room_id });
    if (messages.length === 0) return [];
    if (messages[0].author_id !== user_id && messages[0].receiver_id !== user_id) {
      throw new UnauthorizedException();
    }
    const parsedMessages = messages.map((message) => {
      return {
        message_id: message.message_id,
        message: message.message,
        author: message.author,
        created_at: message.created_at,
      };
    });
    return parsedMessages;
  }

  async postMessage({ author_id, receiver_id, message, room_id }: { author_id: string; receiver_id: string; message: string; room_id: string }) {
    const validReceiver = await this.usersRepository.findUserById(receiver_id);
    if (!validReceiver) throw new NotFoundException();
    return await this.messagesRepository.postMessages({ author_id, receiver_id, message, room_id });
  }

  async postMessages({ messages }: { messages: MessageType[] }) {
    await this.messagesRepository.postManyMessages(messages);
  }

  async updateMessage({ message_id, newMessage }: { message_id: string; newMessage: string }) {
    await this.messagesRepository.updateMessage({ message_id, newMessage });
  }

  async remove(id: string) {
    return await this.messagesRepository.delete(id);
  }
}

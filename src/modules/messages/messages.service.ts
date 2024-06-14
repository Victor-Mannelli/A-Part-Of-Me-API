import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { MessagesRepository } from './messages.repository';
import { MessageType } from './messages.type';

@Injectable()
export class MessagesService {
  constructor(
    readonly messagesRepository: MessagesRepository,
    readonly usersRepository: UsersRepository,
  ) {}

  async getMessages({ author_id, receiver_id }: { author_id: string; receiver_id: string }) {
    const validReceiver = await this.usersRepository.findUserById(author_id);
    if (!validReceiver) throw new NotFoundException();
    return await this.messagesRepository.getMessages({ author_id, receiver_id });
  }

  async postMessage({ author_id, receiver_id, message }: { author_id: string; receiver_id: string; message: string }) {
    const validReceiver = await this.usersRepository.findUserById(receiver_id);
    if (!validReceiver) throw new NotFoundException();
    return await this.messagesRepository.postMessages({ author_id, receiver_id, message });
  }

  async postMessages({ messages }: { messages: MessageType[] }) {
    await this.messagesRepository.postManyMessages(messages);
  }

  async remove(id: string) {
    return await this.messagesRepository.delete(id);
  }
}

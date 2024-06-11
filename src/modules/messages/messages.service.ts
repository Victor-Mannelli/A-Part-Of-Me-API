import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class MessagesService {
  constructor(
    readonly messagesRepository: MessagesRepository,
    readonly usersRepository: UsersRepository,
  ) {}

  // findAll() {
  //   return `This action returns all messages`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }
  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }
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
  async remove(id: number) {
    return await this.messagesRepository.delete(id);
  }
}

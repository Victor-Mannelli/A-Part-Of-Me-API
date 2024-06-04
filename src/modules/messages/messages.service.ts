import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(readonly messagesRepository: MessagesRepository) {}

  // findAll() {
  //   return `This action returns all messages`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }
  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
  async getMessages({ authorId, receiverId }: { authorId: number; receiverId: number }) {
    return { authorId, receiverId };
    // const validReceiver = await this.messagesRepository.findUserById(authorId);
    // if (!validReceiver) throw ({ status: httpStatus.NOT_FOUND, message: 'Message author not found' });
    // return await this.messagesRepository.getMessages({ authorId, receiverId });
  }

  async postMessage({ authorId, receiverId, message }: { authorId: number; receiverId: number; message: string }) {
    return { authorId, receiverId, message };
    // const validReceiver = await this.messagesRepository.findUserById(receiverId);
    // if (!validReceiver) throw ({ status: httpStatus.NOT_FOUND, message: 'Message receiver not found' });
    // return await this.messagesRepository.postMessages({ authorId, receiverId, message });
  }
}

import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageSchema } from './messages.schema';
import { MessageType } from './messages.type';
import { Server, Socket } from 'socket.io';
import Bottleneck from 'bottleneck';

@Injectable()
@WebSocketGateway(8080, { namespace: '/messages', cors: true })
export class MessagesGateway {
  constructor(readonly messagesService: MessagesService) {}

  private messagesCache: MessageType[] = [];
  private timeoutHandle: NodeJS.Timeout | null = null;
  private lock: boolean = false;
  private limiter = new Bottleneck({
    maxConcurrent: 5, // maximum number of concurrent executions
    minTime: 200, // minimum time between executions
  });
  private setupTimeout(): void {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }

    this.timeoutHandle = setTimeout(
      () => {
        this.sendMessagesToDB();
      },
      1000 * 60 * 5,
    );
  }
  private async sendMessagesToDB(): Promise<void> {
    if (this.lock) return;
    this.lock = true;

    if (this.messagesCache.length > 0) {
      try {
        await this.limiter.schedule(() => this.messagesService.postMessages({ messages: this.messagesCache }));
        this.messagesCache = [];
        if (this.timeoutHandle) {
          clearTimeout(this.timeoutHandle);
          this.timeoutHandle = null;
        }
      } catch (error) {
        console.error('Error sending messages to database:', error);
      } finally {
        this.lock = false;
      }
    } else {
      this.lock = false;
    }
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() messageBody: { room: string; message: MessageType }, @ConnectedSocket() client: Socket): void {
    try {
      MessageSchema.parse(messageBody.message);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
    this.server.to(messageBody.room).emit('message', { message: messageBody.message, sender: client.id });

    this.messagesCache.push({
      message_id: messageBody.message.message_id,
      message: messageBody.message.message,
      author_id: messageBody.message.author_id,
      receiver_id: messageBody.message.receiver_id,
      created_at: messageBody.message.created_at,
      room_id: messageBody.room,
    });

    if (this.messagesCache.length === 1) {
      this.setupTimeout();
    }
    if (this.messagesCache.length >= 15) {
      this.sendMessagesToDB();
    }
  }

  OnModuleDestroy() {
    this.sendMessagesToDB();
  }
}

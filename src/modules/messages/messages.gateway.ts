import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageSchema } from './messages.schema';
import { MessageType } from './messages.type';
import { Server, Socket } from 'socket.io';
import Bottleneck from 'bottleneck';
import { z } from 'zod';
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
        const ParsedMessages = this.messagesCache.map((message) => {
          return {
            message_id: message.message_id,
            message: message.message,
            room_id: message.room_id,
            author_id: message.author_id,
            receiver_id: message.receiver_id,
            created_at: message.created_at,
          };
        });
        await this.limiter.schedule(() => this.messagesService.postMessages({ messages: ParsedMessages }));
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
  async handleJoinRoom(@MessageBody() JoinRoomBody: { room: string; user_id: string }, @ConnectedSocket() client: Socket): Promise<void> {
    z.object({ room: z.string(), user_id: z.string() }).parse(JoinRoomBody);
    client.join(JoinRoomBody.room);
    // console.log('user joined');
    // client.emit('joinedRoom', room);

    const cachedMessages = this.messagesCache.reduce((acc, msg) => {
      if (msg.room_id === JoinRoomBody.room) {
        acc.push({
          message_id: msg.message_id,
          message: msg.message,
          author: msg.author,
          created_at: msg.created_at,
        });
      }
      return acc;
    }, []);
    const historicalMessages = await this.messagesService.getMessages({ user_id: JoinRoomBody.user_id, room_id: JoinRoomBody.room });
    client.emit('joinedRoom', { storedMessages: [...historicalMessages, ...cachedMessages] });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    if (this.messagesCache.length > 0) this.sendMessagesToDB();
    client.leave(room);
    // console.log('user left');
    // client.emit('leftRoom', room);
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
      room_id: messageBody.room,
      author_id: messageBody.message.author_id,
      author: messageBody.message.author,
      receiver_id: messageBody.message.receiver_id,
      created_at: messageBody.message.created_at,
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

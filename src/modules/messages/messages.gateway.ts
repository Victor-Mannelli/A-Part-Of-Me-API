import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { MessageSchema } from './messages.schema';
import { MessageType } from './messages.type';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import Bottleneck from 'bottleneck';

@Injectable()
@WebSocketGateway(8080, { cors: '*' })
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
        this.sendMessagesToDatabase();
      },
      1000 * 60 * 5,
    );
  }

  private async sendMessagesToDatabase(): Promise<void> {
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

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: MessageType): void {
    MessageSchema.parse(message);
    this.server.emit('message', message);

    this.messagesCache.push({
      message_id: message.message_id,
      message: message.message,
      author_id: message.author_id,
      receiver_id: message.receiver_id,
      created_at: message.created_at,
    });

    if (this.messagesCache.length === 1) {
      this.setupTimeout();
    }
    if (this.messagesCache.length >= 15) {
      this.sendMessagesToDatabase();
    }
  }

  OnModuleDestroy() {
    this.sendMessagesToDatabase();
  }
}

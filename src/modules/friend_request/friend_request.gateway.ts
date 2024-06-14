import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(8080, { namespace: '/friendRequest', cors: true })
export class FriendRequestGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('friendRequest')
  handleFriendRequest(@MessageBody() data: any): void {
    // Handle friend request logic here
    console.log('Friend Request:', data);
    this.server.emit('friendRequest', data);
  }
}

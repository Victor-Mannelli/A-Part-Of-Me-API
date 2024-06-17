import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { FriendRequestService } from './friend_request.service';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(8080, { namespace: '/friendRequest', cors: true })
export class FriendRequestGateway {
  constructor(readonly friendRequestService: FriendRequestService) {}

  private async sendFriendRequestToDB(userId: string, friendId: string) {
    try {
      return await this.friendRequestService.sendFriendRequests({ userId, friendId });
    } catch (error) {
      console.error('Error sending friends requests to database:', error);
    }
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinFrRoom')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    console.log('user entered FR ws');
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveFrRoom')
  handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    console.log('user left FR ws');
    client.leave(room);
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('friendRequest')
  async handleFriendRequest(
    @MessageBody() friendRequestBody: { room: string; user_id: string; friend_id: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const friendRequest = await this.sendFriendRequestToDB(friendRequestBody.user_id, friendRequestBody.friend_id);
      this.server.emit('friendRequest', { friendRequest, sender: client.id });
    } catch (error) {}
  }
}

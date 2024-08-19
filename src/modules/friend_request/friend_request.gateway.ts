import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendRequestService } from './friend_request.service';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(8080, { namespace: '/friendRequest', cors: true })
export class FriendRequestGateway {
  constructor(readonly friendRequestService: FriendRequestService) {}

  private async sendFriendRequest(userId: string, friendId: string) {
    try {
      return await this.friendRequestService.sendFriendRequests({ userId, friendId });
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  }
  private async deleteFriendRequest(userId: string, friendRequestId: number) {
    try {
      return await this.friendRequestService.deleteFriendRequest(userId, friendRequestId);
    } catch (error) {
      console.error('Error deleting friend request:', error);
    }
  }
  private async acceptFriendRequest(userId: string, friendRequestId: number) {
    try {
      return await this.friendRequestService.acceptFriendRequest(userId, friendRequestId);
    } catch (error) {
      console.error('Error deleting friend request:', error);
    }
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinFrRoom')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    // console.log('user entered FR ws');
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveFrRoom')
  handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): void {
    // console.log('user left FR ws');
    client.leave(room);
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('friendRequest')
  async handleSendFriendRequest(
    @MessageBody() friendRequestBody: { room: string; user_id: string; friend_id: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const friendRequest = await this.sendFriendRequest(friendRequestBody.user_id, friendRequestBody.friend_id);
      this.server.emit('friendRequest', {
        ...friendRequest,
        requester: {
          ...friendRequest.requester,
          avatar: { data: friendRequest.requester.avatar },
        },
        sender: client.id,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @SubscribeMessage('deleteFR')
  async handleDeleteFriendRequest(
    @MessageBody() friendRequestBody: { room: string; user_id: string; friendRequestId: number },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const deletedFR = await this.deleteFriendRequest(friendRequestBody.user_id, friendRequestBody.friendRequestId);
      this.server.emit('deleteFR', { deletedFR, sender: client.id });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @SubscribeMessage('acceptFR')
  async handleAcceptFriendRequest(
    @MessageBody() friendRequestBody: { room: string; user_id: string; friendRequestId: number },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const acceptedFR = await this.acceptFriendRequest(friendRequestBody.user_id, friendRequestBody.friendRequestId);
      this.server.emit('acceptFR', { acceptedFR, sender: client.id });
      this.server.emit('deleteFR', { deletedFR: { friend_request_id: friendRequestBody.friendRequestId }, sender: client.id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

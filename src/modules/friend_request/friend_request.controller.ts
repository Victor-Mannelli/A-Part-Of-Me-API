import { Body, Controller, Delete, Get, Param, Post, Response } from '@nestjs/common';
import { FriendRequestService } from './friend_request.service';

@Controller('friendRequest')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Get()
  async getFriendRequests(@Response() res) {
    const response = await this.friendRequestService.getFriendRequests(res.locals.user_id);
    res.status(200).send(response);
  }
  @Post()
  async sendFriendRequest(@Response() res, @Body() { friend_id }: { friend_id: number }) {
    const response = await this.friendRequestService.sendFriendRequests({
      userId: res.locals.user_id,
      friendId: friend_id,
    });
    res.status(200).send(response);
  }

  @Post('/accept/:id')
  async acceptFriendRequest(@Param('id') id: string) {
    return await this.friendRequestService.acceptFriendRequest(+id);
  }

  @Delete(':friendRequestId')
  async deleteFriendRequest(@Response() res, @Param('friendRequestId') friendRequestId: number) {
    const response = await this.friendRequestService.deleteFriendRequest(res.locals.user_id, +friendRequestId);
    res.status(200).send(response);
  }
}

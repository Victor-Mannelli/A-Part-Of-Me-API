import { Controller, Get, Param, Delete, Response } from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Get('/friendList')
  async getFriendList(@Response() res) {
    const response = await this.friendshipService.getFriendList(res.locals.user_id);
    res.status(200).send(response);
  }

  @Delete(':id')
  removeFriend(@Param('id') id: string) {
    return this.friendshipService.removeFriend(+id);
  }
}

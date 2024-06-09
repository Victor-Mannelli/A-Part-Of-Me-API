import { Controller, Get, Post, Body, Response, Delete, Param } from '@nestjs/common';
import { AcceptFriendRequestDto } from './friends.dto';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  // @Post()
  // create(@Body() createFriendDto: CreateFriendDto) {
  //   return this.friendsService.create(createFriendDto);
  // }
  // @Get()
  // findAll() {
  //   return this.friendsService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendsService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
  //   return this.friendsService.update(+id, updateFriendDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.friendsService.remove(+id);
  // }
  // @Delete('/friend:id')
  // @Delete('/friendRequest/:id')

  @Get('/friendList')
  async getFriendList(@Response() res) {
    const response = await this.friendsService.getFriendList(res.locals.user_id);
    res.status(200).send(response);
  }
  @Get('/friendRequests')
  async getFriendRequests(@Response() res) {
    const response = await this.friendsService.getFriendRequests(res.locals.user_id);
    res.status(200).send(response);
  }
  @Get('/strangersAndFRs')
  async getStrangersAndFRs(@Response() res) {
    const response = await this.friendsService.getStrangersAndFRs(res.locals.user_id);
    res.status(200).send(response);
  }

  @Post('/friendRequest')
  async sendFriendRequest(@Response() res, @Body() { friend_id }: { friend_id: number }) {
    const response = await this.friendsService.sendFriendRequests({
      userId: res.locals.user_id,
      friendId: friend_id,
    });
    res.status(200).send(response);
  }

  @Post('/friendRequest/accept')
  async acceptFriendRequest(@Body() acceptFriendRequestDto: AcceptFriendRequestDto) {
    return await this.friendsService.acceptFriendRequest(acceptFriendRequestDto);
  }

  @Delete('/friendRequest/:friendRequestId')
  async deleteFriendRequest(@Response() res, @Param('friendRequestId') friendRequestId: string) {
    return await this.friendsService.deleteFriendRequest(res.locals.user_id, +friendRequestId);
  }
}

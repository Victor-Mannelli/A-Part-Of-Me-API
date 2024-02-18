import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcceptFriendRequestDto } from './friends.dto';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }

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

  @Get('/friendList/:id')
  async getFriendList(@Param('id') id: string) {
    return await this.friendsService.getFriendList(Number(id));
  }
  // @Delete('/friend:id')


  // @Delete('/friendRequest/:id')


  @Get('/friendRequest/:id')
  async getFriendRequests(@Param('id') id: string) {
    return await this.friendsService.getFriendRequests(Number(id));
  }

  @Post('/friendRequest/:id')
  async sendFriendRequest(@Param('id') id: string, @Body() friendId: number) {
    return await this.friendsService.sendFriendRequests({ userId: Number(id), friendId });
  }

  @Post('/friendRequest/accept')
  async acceptFriendRequest(@Body() acceptFriendRequestDto: AcceptFriendRequestDto) {
    return await this.friendsService.acceptFriendRequest(acceptFriendRequestDto);
  }

}

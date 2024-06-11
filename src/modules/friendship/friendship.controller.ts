// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  // @Get()
  // findAll() {
  //   return this.friendshipService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendshipService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFriendshipDto: UpdateFriendshipDto) {
  //   return this.friendshipService.update(+id, updateFriendshipDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipService.remove(+id);
  }
}

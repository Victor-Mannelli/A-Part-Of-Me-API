// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // @Post()
  // create(@Body() createMessageDto: CreateMessageDto) {
  //   return this.messagesService.create(createMessageDto);
  // }
  // @Get()
  // findAll() {
  //   return this.messagesService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messagesService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(+id, updateMessageDto);
  // }

  @Get(':id')
  async find() {
    // return await this.messagesService.getMessages({
    //   // authorId: Number(req.params.authorId),
    //   // receiverId: res.locals.user.user_id
    //   authorId: "",
    //   receiverId: "",
    // });
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async post(@Body() message: string) {
    return message;
    // return await this.messagesService.postMessage({
    //   // authorId: res.locals.user.user_id,
    //   // receiverId: Number(req.params.receiverId),
    //   authorId: "",
    //   receiverId: "",
    //   message,
    // });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return id;
    // return this.messagesService.remove(+id);
  }
}

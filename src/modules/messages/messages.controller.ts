// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Response } from '@nestjs/common';
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

  @Get(':authorId')
  async findAllFromChat(@Response() res, @Param('authorId') author_id: string) {
    const response = await this.messagesService.getMessages({
      author_id,
      receiver_id: res.locals.user_id,
    });
    res.status(200).send(response);
  }

  // @HttpCode(HttpStatus.CREATED)
  @Post(':receiverId')
  async post(@Response() res, @Body() Body: { message: string }, @Param('receiverId') receiver_id: string) {
    const response = await this.messagesService.postMessage({
      author_id: res.locals.user_id,
      receiver_id,
      message: Body.message,
    });
    res.status(201).send(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.messagesService.remove(id);
  }
}

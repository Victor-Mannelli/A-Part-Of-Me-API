// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Response } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { z } from 'zod';
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':room')
  async findAllFromChat(@Response() res, @Param('room') room_id: string) {
    const response = await this.messagesService.getMessages({
      room_id,
      user_id: res.locals.user_id,
    });
    res.status(200).send(response);
  }

  @Post(':room_id')
  async post(@Response() res, @Body() Body: { message: string; receiver_id: string }, @Param('room_id') room_id: string) {
    z.object({ message: z.string(), receiver_id: z.string() }).parse(Body);
    const response = await this.messagesService.postMessage({
      author_id: res.locals.user_id,
      message: Body.message,
      receiver_id: Body.receiver_id,
      room_id,
    });
    res.status(201).send(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.messagesService.remove(id);
  }
}

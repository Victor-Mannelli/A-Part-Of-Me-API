import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
  imports: [UsersModule],
})
export class MessagesModule {}

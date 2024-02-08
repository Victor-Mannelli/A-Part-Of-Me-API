import { MessagesModule } from './messages/messages.module';
import { FriendsModule } from './friends/friends.module';
import { AnimesModule } from './animes/animes.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, AnimesModule, FriendsModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

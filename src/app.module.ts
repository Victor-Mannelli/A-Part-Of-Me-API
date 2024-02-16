import { MessagesModule } from './modules/messages/messages.module';
import { FriendsModule } from './modules/friends/friends.module';
import { AnimesModule } from './modules/animes/animes.module';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, AnimesModule, FriendsModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { FriendshipModule } from './modules/friendship/friendship.module';
import { AnimelistModule } from './modules/animelist/animelist.module';
import { ZodErrorsInterceptor } from './middlewares/zod.middleware';
import { MessagesModule } from './modules/messages/messages.module';
import { FriendsModule } from './modules/friends/friends.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UsersModule } from './modules/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FriendsChatGateway } from './modules/friends_chat/friends_chat.gateway';

@Module({
  imports: [UsersModule, FriendsModule, MessagesModule, AnimelistModule, FriendshipModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodErrorsInterceptor,
    },
    FriendsChatGateway,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'users/register', method: RequestMethod.ALL }, { path: 'users/login', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}

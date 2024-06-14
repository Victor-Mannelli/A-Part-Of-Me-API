import { FriendRequestModule } from './modules/friend_request/friend_request.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { FriendshipModule } from './modules/friendship/friendship.module';
import { AnimelistModule } from './modules/animelist/animelist.module';
import { ZodErrorsInterceptor } from './middlewares/zod.middleware';
import { MessagesModule } from './modules/messages/messages.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UsersModule } from './modules/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [UsersModule, MessagesModule, AnimelistModule, FriendshipModule, FriendRequestModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodErrorsInterceptor,
    },
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

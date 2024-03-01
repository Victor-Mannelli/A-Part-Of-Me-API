import { MessagesModule } from './modules/messages/messages.module';
import { FriendsModule } from './modules/friends/friends.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AnimesModule } from './modules/animes/animes.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, AnimesModule, FriendsModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('users/register')
      .exclude('users/login')
      .forRoutes('*');
  }
}

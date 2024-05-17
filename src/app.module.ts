import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ZodErrorsInterceptor } from './middlewares/zod.middleware';
import { MessagesModule } from './modules/messages/messages.module';
import { FriendsModule } from './modules/friends/friends.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AnimesModule } from './modules/animes/animes.module';
import { UsersModule } from './modules/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AnimelistModule } from './modules/animelist/animelist.module';

@Module({
  imports: [
    UsersModule,
    AnimesModule,
    FriendsModule,
    MessagesModule,
    AnimelistModule,
  ],
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
      .exclude(
        { path: 'users/register', method: RequestMethod.ALL },
        { path: 'users/login', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}

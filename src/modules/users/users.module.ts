import { UserMiddleware } from 'src/middlewares/users.middleware';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude('users/register')
      .exclude('users/login')
      .forRoutes('*');
  }
}

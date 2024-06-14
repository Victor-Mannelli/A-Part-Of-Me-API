import { HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { FriendRequestRepository } from '../friend_request/friend_request.repository';
import { FriendshipRepository } from '../friendship/friendship.repository';
import { CreateUserDto, LoginDto, UpdateUserDto } from './users.dto';
import { CreateUserSchema, LoginSchema } from './users.schema';
import { UsersRepository } from './users.repository';
import { JwtPayload } from 'src/utils/types';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    readonly usersRepository: UsersRepository,
    readonly friendRequestRepository: FriendRequestRepository,
    readonly friendshipRepository: FriendshipRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    CreateUserSchema.parse(createUserDto);

    const result = await this.usersRepository.checkEmail(createUserDto.email);
    if (result) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'User already exists!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const hashedPassword: string = bcrypt.hashSync(createUserDto.password, 10);
    return await this.usersRepository.createNewUser({
      email: createUserDto.email,
      username: createUserDto.username,
      hashedPassword,
    });
  }
  async login(loginDto: LoginDto) {
    LoginSchema.parse(loginDto);

    const user = loginDto.login.includes('@')
      ? await this.usersRepository.checkEmail(loginDto.login)
      : await this.usersRepository.checkUsername(loginDto.login);
    if (!user) throw new UnauthorizedException();

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const newJwt: JwtPayload = {
      user_id: user.user_id.toString(),
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    };
    return { token: jwt.sign(newJwt, process.env.JWT_SECRET) };
  }

  async findAll(id: string) {
    return await this.usersRepository.getUsersList(id);
  }
  async findOne(id: string) {
    return await this.usersRepository.findUser(id);
  }

  async getStrangersAndFRs(userId: string) {
    try {
      const userFriends = await this.friendshipRepository.getFriendList(userId);
      const userFriendsIds = userFriends.map((user) => {
        if (user.friend_id !== userId) {
          return user.friend_id;
        } else {
          return user.user_id;
        }
      });
      const strangers = await this.usersRepository.findNewPossibleFriends([...userFriendsIds, userId]);
      const FRs = await this.friendRequestRepository.getFriendRequests(userId);

      return { strangers: [...strangers], friendRequests: [...FRs] };
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    const newHashedPassword = bcrypt.hashSync(updateUserDto.newPassword, 10);
    return await this.usersRepository.changePassword({
      userId: updateUserDto.userId,
      newHashedPassword,
    });
  }
  async remove(id: string) {
    return await this.usersRepository.deleteAccount(id);
  }
}

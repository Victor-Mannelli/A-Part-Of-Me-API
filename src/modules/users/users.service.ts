import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from './users.dto';
import { CreateUserSchema, LoginSchema } from './users.schema';
import { UsersRepository } from './users.repository';
import { JwtPayload } from 'src/utils/types';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(readonly usersRepository: UsersRepository) {}

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

    const user = loginDto.login.includes('@') ? await this.usersRepository.checkEmail(loginDto.login) : await this.usersRepository.checkUsername(loginDto.login);
    if (!user) throw new UnauthorizedException();

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const newJwt: JwtPayload = {
      user_id: user.user_id.toString(),
      email: user.email,
      username: user.username,
      // avatar: user.avatar,
    };
    return { token: jwt.sign(newJwt, process.env.JWT_SECRET) };
    // return await this.usersRepository.logingUser({ userId, token: uuid() });
  }

  async findAll() {
    return await this.usersRepository.getUsersList();
  }
  async findOne(id: number) {
    return await this.usersRepository.findUser(id);
  }
  async update(updateUserDto: UpdateUserDto) {
    const newHashedPassword = bcrypt.hashSync(updateUserDto.newPassword, 10);
    return await this.usersRepository.changePassword({
      userId: updateUserDto.userId,
      newHashedPassword,
    });
  }
  async remove(id: number) {
    return await this.usersRepository.deleteAccount(id);
  }
}

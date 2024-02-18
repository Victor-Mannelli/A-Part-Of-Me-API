import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from './users.dto';
import { UsersRepository } from './users.repository';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.checkEmail(createUserDto.email);
    if (Object.keys(result).length !== 0) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'User already exists!',
      },
        HttpStatus.UNAUTHORIZED
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
    const user = loginDto.login.includes('@')
      ? await this.usersRepository.checkEmail(loginDto.login)
      : await this.usersRepository.checkUsername(loginDto.login);

    if (Object.keys(user).length === 0) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: 'User doesn\'t exist!',
      },
        HttpStatus.NOT_FOUND
      );
    }
    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Wrong password!',
      },
        HttpStatus.UNAUTHORIZED
      );
    }
    const userId: number = user.user_id;
    await this.usersRepository.deleteUserSessions(userId);
    return await this.usersRepository.logingUser({ userId, token: uuid() });
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
      newHashedPassword
    });
  }
  async remove(id: number) {
    return await this.usersRepository.deleteAccount(id);
  }
}

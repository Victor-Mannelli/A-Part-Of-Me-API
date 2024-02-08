import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './users.dto';
import bcrypt from 'bcrypt';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const result = this.usersRepository.checkEmail(createUserDto.email);
    if (result !== null) {
      throw {
        status: HttpStatus.UNAUTHORIZED,
        message: 'User already exists!',
      };
    }

    const hashedPassword: string = bcrypt.hashSync(createUserDto.password, 10);
    return await this.usersRepository.createNewUser({
      email: createUserDto.email,
      username: createUserDto.username,
      hashedPassword,
    });
  }
}
// findAll() {
//   return `This action returns all users`;
// }
// findOne(id: number) {
//   return `This action returns a #${id} user`;
// }
// update(id: number, updateUserDto: UpdateUserDto) {
//   return `This action updates a #${id} user`;
// }
// remove(id: number) {
//   return `This action removes a #${id} user`;
// }

// export async function loginService({ login, password }: { login: string, password: string }) {
//   let user;
//   login.includes('@')
//     ? user = await checkEmail(login)
//     : user = await checkUsername(login);
//     if (user === null) throw ({ status: httpStatus.NOT_FOUND, message: 'User doesn\'t exist!' });

//     if (!bcrypt.compareSync(password, user.password)) throw ({
//       status: httpStatus.UNAUTHORIZED,
//       message: 'Wrong password!'
//     });

//     const userId: number = user.user_id;
//     await deleteUserSessions(userId);
//     return await logingUser({ userId, token: uuid() });
//   }
//   export async function getUserDataService(userId: number) {
//     return await findFirstUserData(userId);
//   }
//   export async function changePasswordService(params: ChangePasswordBody) {
//     const newHashedPassword = bcrypt.hashSync(params.newPassword, 10);
//     return await changePassword({ userId: params.userId, newHashedPassword });
//   }
//   export async function deleteAccountService(userId: number) {
//     return await deleteAccount(userId);
//   }
//   export async function allUsersService() {
//     return await getUsersList();
//   }

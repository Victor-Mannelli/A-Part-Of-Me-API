import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Patch, Delete, Response } from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() registrationDto: CreateUserDto) {
    return await this.usersService.create(registrationDto);
  }
  @Post('/login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Body() loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }

  @Get('/all')
  async findAll() {
    return await this.usersService.findAll();
  }
  @Get()
  async findOne(@Response() res: any) {
    const response = await this.usersService.findOne(res.locals.user_id);
    res.status(200).send(response);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}

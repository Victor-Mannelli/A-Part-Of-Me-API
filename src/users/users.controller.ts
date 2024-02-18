import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  registration(@Body() registrationDto: CreateUserDto) {
    return this.usersService.create(registrationDto);
  }
  @Post('/login') 
  @HttpCode(HttpStatus.ACCEPTED)
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword: string;
}
export class LoginDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
}
export class UpdateUserDto {
  @ApiProperty()
  avatar?: string;
  @ApiProperty()
  banner?: string;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  newPassword?: string;
}

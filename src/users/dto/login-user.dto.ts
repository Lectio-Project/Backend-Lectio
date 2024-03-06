import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

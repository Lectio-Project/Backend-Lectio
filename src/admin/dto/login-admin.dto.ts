import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';

export class LoginDto extends PickType(CreateAdminDto, ['email', 'password']) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

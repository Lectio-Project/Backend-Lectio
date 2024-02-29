import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCompletelyName } from 'src/utils/validators/IsCompletelyName';
import { IsValidPassword } from 'src/utils/validators/IsValidPassword';
import { IsNotDigitAndSpecialChar } from './../../utils/validators/IsNotDigitAndSpecialChar';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsCompletelyName()
  @IsNotDigitAndSpecialChar()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsValidPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsValidPassword()
  comfirmPassword: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsNotEmpty()
  checked: boolean;
}

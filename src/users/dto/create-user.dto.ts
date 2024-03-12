import { ApiProperty } from '@nestjs/swagger';
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
import { IsNotDigitAndSpecialChar } from 'src/utils/validators/IsNotDigitAndSpecialChar';
import { IsValidPassword } from 'src/utils/validators/IsValidPassword';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'O campo nome deve ser uma string' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @IsCompletelyName({ message: 'O campo nome deve ter nome e sobrenome' })
  @IsNotDigitAndSpecialChar({
    message: 'O campo nome não deve ter dígitos ou caracteres especiais',
  })
  name: string;

  @ApiProperty()
  @IsString({ message: 'O campo email deve ser uma string' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail({}, { message: 'Endereço de e-mail inválido' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MinLength(8, { message: 'O campo senha deve ter no mínimo 8 caracteres' })
  @MaxLength(20, { message: 'O campo senha deve ter no máximo 20 caracteres' })
  @IsValidPassword({
    message:
      'O campo senha deve ter pelos menos uma letra maiúscula, uma letra minúscula, um carácter especial e um número',
  })
  password: string;

  @ApiProperty()
  @IsString({ message: 'O campo confirmação de senha deve ser uma string' })
  @IsNotEmpty({ message: 'O campo confirmação de senha é obrigatório' })
  @MinLength(8, {
    message: 'O campo confirmação de senha deve ter no mínimo 8 caracteres',
  })
  @MaxLength(20, {
    message: 'O campo confirmação de senha deve ter no máximo 20 caracteres',
  })
  @IsValidPassword({
    message:
      'O campo confirmação de senha deve ter pelos menos uma letra maiúscula, uma letra minúscula, um carácter especial e um número',
  })
  confirmPassword: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'O campo bio deve ser uma string' })
  @MaxLength(500, { message: 'O campo bio deve ter no máximo 500 caracteres' })
  bio?: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'O campo username deve ser uma string' })
  @IsOptional()
  userName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsBoolean({
    message: 'O campo de aceitação dos termos de uso deve ser um boolean',
  })
  @IsNotEmpty({ message: 'A aceitação dos termos de uso é obrigatória' })
  checked: boolean;
}

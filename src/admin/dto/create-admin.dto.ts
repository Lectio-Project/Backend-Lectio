import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCompletelyName } from 'src/utils/validators/IsCompletelyName';
import { IsNotDigitAndSpecialChar } from 'src/utils/validators/IsNotDigitAndSpecialChar';
import { IsValidPassword } from 'src/utils/validators/IsValidPassword';

export class CreateAdminDto {
  @ApiProperty()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsCompletelyName({ message: 'Escreva nome e sobrenome' })
  @IsNotDigitAndSpecialChar({
    message: 'O nome não pode conter números ou caracteres especiais',
  })
  name: string;

  @ApiProperty()
  @IsString({ message: 'O email deve ser uma string' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @MinLength(8, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  })
  @MaxLength(20, {
    message: 'A senha deve ter no máximo 20 caracteres',
  })
  @IsValidPassword({
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minuscula, um número e um caractere especial',
  })
  password: string;

  @ApiProperty()
  @IsString({ message: 'A confirmação da senha deve ser uma string' })
  @IsNotEmpty({ message: 'A confirmação da senha não pode ser vazia' })
  @MinLength(8, {
    message: 'A confirmação da senha deve ter no mínimo 8 caracteres',
  })
  @MaxLength(20, {
    message: 'A confirmação da senha deve ter no máximo 20 caracteres',
  })
  @IsValidPassword({
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minuscula, um número e um caractere especial',
  })
  confirmPassword: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotDigitAndSpecialChar } from 'src/utils/validators/IsNotDigitAndSpecialChar';

export class CreateThoughtDto {
  @ApiProperty()
  @IsString({ message: 'O campo frase deve ser uma string' })
  @IsNotEmpty({ message: 'O campo frase é obrigatório' })
  @IsNotDigitAndSpecialChar({
    message: 'O campo frase não deve ter dígitos ou caracteres especiais',
  })
  phrase: string;

  @ApiProperty()
  @IsString({ message: 'O campo id do livro deve ser uma string' })
  @IsNotEmpty({ message: 'O campo id do livro é obrigatório' })
  bookId: string;
}

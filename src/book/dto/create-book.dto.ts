import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsValidYear } from 'src/utils/validators/IsValidYear';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O campo nome do livro é obrigatório' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'O campo sinopse deve ser uma string' })
  @IsNotEmpty({ message: 'O campo sinopse é obrigatório' })
  @MinLength(50, {
    message: 'O campo sinopse deve ter no mínimo 50 caracteres',
  })
  @MaxLength(500, {
    message: 'O campo sinopse deve ter no máximo 500 caracteres',
  })
  synopsis: string;

  @ApiProperty()
  @IsString({ message: 'O campo editora do livro deve ser uma string' })
  @IsNotEmpty({ message: 'O campo editora do livro é obrigatório' })
  publishingCompany: string;

  @ApiProperty()
  @IsNumberString(
    {},
    {
      message:
        'O campo ano de publicação do livro deve ser uma string numérica',
    },
  )
  @IsNotEmpty({ message: 'O campo ano de publicação do livro é obrigatório' })
  @IsValidYear({
    message: `O campo ano de publicação do livro de ser no formato YYYY e não pode ser maior que ${new Date().getFullYear()}`,
  })
  publishYear: string;

  @ApiProperty()
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do gênero deve conter uma string ou um array de strings no formato ObjectId',
  })
  @IsNotEmpty({ message: 'O campo id do gênero é obrigatório' })
  genderId: string;

  @ApiProperty({
    type: () => [String],
  })
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do autor deve conter uma string ou um array de strings no formato ObjectId',
  })
  @IsNotEmpty({ message: 'O campo id do autor é obrigatório' })
  authorId: string | Array<string>;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsISBN,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsValidYear } from 'src/utils/validators/IsValidYear';
import { CreateLiteraryAwardsDto } from './create-literary-awards.dto';

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

  @ApiProperty()
  @IsISBN(13, { message: 'O campo ISBN-13 do livro é inválido' })
  @IsNotEmpty({ message: 'O campo ISBN-13 do livro é obrigatório' })
  isbn13: string;

  @ApiProperty()
  @IsString({ message: 'O campo totalPages do livro deve ser uma string' })
  @IsNotEmpty({ message: 'O campo totalPages do livro é obrigatório' })
  @IsNumberString({}, { message: 'O campo totalPages deve ser um número' })
  totalPages: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'O campo imageUrl do livro deve ser uma string' })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ type: () => [CreateLiteraryAwardsDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLiteraryAwardsDto)
  awards?: Array<CreateLiteraryAwardsDto>;

  @ApiProperty({ required: false })
  @Type(() => Boolean)
  @IsOptional()
  isMovie?: boolean = false;
}

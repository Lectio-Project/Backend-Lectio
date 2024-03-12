import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsCompletelyName } from 'src/utils/validators/IsCompletelyName';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString({ message: 'O campo nome deve ser uma string' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @IsCompletelyName({ message: 'O campo nome deve ter nome e sobrenome' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'O campo imagem do autor deve ser uma string' })
  @IsOptional()
  imageUrl: string;

  @ApiProperty()
  @IsString({
    message: 'O campo descrição da carreira do autor deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O campo descrição da carreira do autor é obrigatório',
  })
  @MinLength(50, {
    message:
      'O campo descrição da carreira do autor deve ter no mínimo 50 caracteres',
  })
  carrerDescription: string;

  @ApiProperty()
  @IsString({ message: 'O campo local de nascimento deve ser uma string' })
  @IsNotEmpty({ message: 'O campo local de nascimento é obrigatório' })
  @MaxLength(100, {
    message: 'O campo local de nascimento deve ter no máximo 100 caracteres',
  })
  birthplace: string;

  @ApiProperty({
    type: () => [String],
  })
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do gênero deve conter uma string ou um array de strings no formato ObjectId',
  })
  @IsNotEmpty({ message: 'O campo id do gênero é obrigatório' })
  genresId: string | Array<string>;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IsIdString } from 'src/utils/validators/IsIdString';

export class CreateCommentDto {
  @ApiProperty()
  @IsString({ message: 'O comentário deve ser uma string' })
  @IsNotEmpty({ message: 'O comentário é obrigatório' })
  @MaxLength(500, { message: 'O comentário deve ter no máximo 500 caracteres' })
  text: string;

  @ApiProperty()
  @IsNumber({}, { message: 'A nota do livro deve ser um número' })
  @Min(0, { message: 'A nota mínima para o livro é 0' })
  @Max(5, { message: 'A nota máxima para o livro é 5' })
  bookGrade: number;

  @ApiProperty()
  @IsIdString({
    message: 'O campo id do livro deve conter uma string no formato ObjectId',
  })
  bookId: string;
}

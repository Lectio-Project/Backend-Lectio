import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateLiteraryAwardsDto {
  @ApiProperty()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome deve ser informado' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @ApiProperty()
  @IsNumberString({}, { message: 'O ano deve ser uma string de número' })
  @IsNotEmpty({ message: 'O ano deve ser informado' })
  @Length(4, 4, { message: 'O ano deve ter 4 caracteres' })
  year: string;
}

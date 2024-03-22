import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty({ required: false })
  confirmPassword?: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  userName?: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty({
    type: () => [String],
    example: ['id do(s) gênero'],
    required: false,
  })
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do gênero deve conter uma string ou um array de strings no formato ObjectId',
  })
  genresId?: string | Array<string>;

  @ApiProperty({
    type: () => [String],
    example: ['id do(s) autor'],
    required: false,
  })
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do autor deve conter uma string ou um array de strings no formato ObjectId',
  })
  authorsId?: string | Array<string>;

  @ApiProperty({
    type: () => [String],
    example: ['id do(s) livro'],
    required: false,
  })
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do livro deve conter uma string ou um array de strings no formato ObjectId',
  })
  booksId?: string | Array<string>;
}

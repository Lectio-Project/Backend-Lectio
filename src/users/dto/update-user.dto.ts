import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArrayOfIdStrings } from 'src/utils/validators/IsArrayOfIdStrings';
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
  @IsArrayOfIdStrings({
    message:
      'O campo id do gênero deve conter um array de strings no formato ObjectId',
  })
  genresId?: Array<string>;

  @ApiProperty({
    type: () => [String],
    example: ['id do(s) autor'],
    required: false,
  })
  @IsArrayOfIdStrings({
    message:
      'O campo id do autor deve conter um array de strings no formato ObjectId',
  })
  authorsId?: Array<string>;

  @ApiProperty({
    type: () => [String],
    example: ['id do(s) livro'],
    required: false,
  })
  @IsArrayOfIdStrings({
    message:
      'O campo id do livro deve conter um array de strings no formato ObjectId',
  })
  booksId?: Array<string>;
}

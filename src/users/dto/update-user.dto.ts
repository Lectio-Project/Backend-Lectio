import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
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
  genresId?: string | Array<string>;

  @ApiProperty({
    type: () => [String],
    example: ['id do(s) autor'],
    required: false,
  })
  authorsId?: string | Array<string>;

  @ApiProperty({
    type: () => [String],
    example: ['id do(s) livro'],
    required: false,
  })
  booksId?: string | Array<string>;
}

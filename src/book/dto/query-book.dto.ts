import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsIncludedInOptions } from 'src/utils/validators/IsIncludedInOptions';

export class QueryBookDto {
  @ApiProperty({
    required: false,
    enum: ['author', 'gender', 'user', 'thought', 'comment'],
  })
  @IsOptional()
  @IsIncludedInOptions(['author', 'gender', 'user', 'thought', 'comment'])
  add?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by author id or [authors id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do autor deve conter uma string ou um array de strings no formato ObjectId',
  })
  authorId?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by gender id or [genres id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do gênero deve conter uma string ou um array de strings no formato ObjectId',
  })
  genderId?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by user id or [users id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do usuário deve conter uma string ou um array de strings no formato ObjectId',
  })
  userId?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by comment id or [comments id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do comentário deve conter uma string ou um array de strings no formato ObjectId',
  })
  commentId?: string | Array<string>;

  @ApiProperty({
    required: false,
    example: 'filter by thought id or [thoughts id]',
  })
  @IsOptional()
  @IsArrayOfIdStringsOrIdString({
    message:
      'O campo id do pensamento deve conter uma string ou um array de strings no formato ObjectId',
  })
  thoughtId?: string | Array<string>;
}

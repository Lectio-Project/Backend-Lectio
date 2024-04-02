import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { CreateBookDto } from './create-book.dto';
import { UpdateLiteraryAwardsDto } from './update-literary-awards.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    required: false,
  })
  @IsNumberString(
    {},
    {
      message:
        'O campo ano de publicação do livro deve ser uma string numérica',
    },
  )
  @IsOptional()
  grade?: string;

  @ApiProperty({
    required: false,
  })
  name?: string;

  @ApiProperty({
    required: false,
  })
  synopsis?: string;

  @ApiProperty({
    required: false,
  })
  publishingCompany?: string;

  @ApiProperty({
    required: false,
  })
  publishYear?: string;

  @ApiProperty({
    type: () => [String],
    required: false,
  })
  genderId?: string;

  @ApiProperty({
    type: () => [String],
    required: false,
  })
  authorId?: string | Array<string>;

  @ApiProperty({ required: false })
  isbn13: string;

  @ApiProperty({ required: false })
  totalPages: string;

  @ApiProperty({ required: false })
  imageUrl: string;

  @ApiProperty({ type: () => [UpdateLiteraryAwardsDto], required: false })
  awards?: Array<UpdateLiteraryAwardsDto>;
}

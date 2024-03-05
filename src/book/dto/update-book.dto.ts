import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    required: false,
  })
  @IsNumberString()
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
}

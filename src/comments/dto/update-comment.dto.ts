import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty()
  text: string;

  @ApiProperty()
  bookGrade: number;

  @ApiProperty()
  bookId: string;
}

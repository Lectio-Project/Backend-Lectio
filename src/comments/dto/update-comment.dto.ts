import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(
  OmitType(CreateCommentDto, ['bookId'] as const),
) {
  @ApiProperty({ required: false })
  text: string;

  @ApiProperty({ required: false })
  bookGrade: number;
}

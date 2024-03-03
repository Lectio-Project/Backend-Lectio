import { OmitType } from '@nestjs/mapped-types';
import { UpdateBookDto } from './update-book.dto';

export class UpdateBookServiceDto extends OmitType(UpdateBookDto, [
  'authorId',
  'grade',
]) {
  grade?: number;
  authorIds?: Array<string>;
}

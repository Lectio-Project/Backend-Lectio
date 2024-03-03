import { OmitType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class CreateBookServiceDto extends OmitType(CreateBookDto, [
  'authorId',
]) {
  authorIds: Array<string>;
}

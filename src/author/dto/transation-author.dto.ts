import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';

export class TransationAuthorDto extends PartialType(
  OmitType(CreateAuthorDto, ['genres'] as const),
) {
  genres?: Array<string>;
}

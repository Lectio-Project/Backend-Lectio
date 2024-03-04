import { PartialType } from '@nestjs/mapped-types';
import { IsNumberString, IsOptional } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNumberString()
  @IsOptional()
  grade?: string;
}

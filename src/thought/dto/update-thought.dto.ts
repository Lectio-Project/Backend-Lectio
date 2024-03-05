import { ApiProperty } from '@nestjs/swagger';
import { CreateThoughtDto } from './create-thought.dto';

export class UpdateThoughtDto extends CreateThoughtDto {
  @ApiProperty()
  phrase: string;

  @ApiProperty()
  bookId: string;
}

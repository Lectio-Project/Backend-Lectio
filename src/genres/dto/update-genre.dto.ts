import { ApiProperty } from '@nestjs/swagger';
import { CreateGenreDto } from './create-genre.dto';

export class UpdateGenreDto extends CreateGenreDto {
  @ApiProperty()
  gender: string;
}

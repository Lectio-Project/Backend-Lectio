import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLiteraryAwardsDto } from './create-literary-awards.dto';

export class UpdateLiteraryAwardsDto extends PartialType(
  CreateLiteraryAwardsDto,
) {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  year: string;
}

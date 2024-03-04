import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  usersId?: Array<string>;
}

import { IsOptional } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsIncludedInOptions } from 'src/utils/validators/IsIncludedInOptions';

export class QueryBookDto {
  @IsOptional()
  @IsIncludedInOptions(['author', 'gender', 'user', 'thought', 'comment'])
  add?: string | Array<string>;

  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  authorId?: string | Array<string>;

  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  genderId?: string | Array<string>;

  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  userId?: string | Array<string>;

  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  commentId?: string | Array<string>;

  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  thoughtId?: string | Array<string>;
}

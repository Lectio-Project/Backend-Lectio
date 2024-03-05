import { IsOptional } from 'class-validator';
import { IsArrayOfIdStringsOrIdString } from 'src/utils/validators/IsArrayOfIdStringsOrIdString';
import { IsIncludedInOptions } from 'src/utils/validators/IsIncludedInOptions';

export class QueryAuthorDto {
  @IsOptional()
  @IsArrayOfIdStringsOrIdString()
  genresId?: string | Array<string>;

  @IsOptional()
  @IsIncludedInOptions(['book', 'gender', 'user'])
  add?: string | Array<string>;
}
